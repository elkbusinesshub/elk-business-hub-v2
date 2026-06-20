import { NextRequest, NextResponse } from "next/server";

// Live English→Malayalam (or any target) translation via the free MyMemory API.
// Used by the blog language toggle. Results are cached in memory so the same
// article text isn't re-translated on every toggle/visit. Nothing is stored
// in Sanity.

const cache = new Map<string, string>();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Split into <=450-char chunks at sentence / word boundaries (MyMemory rejects
// long queries).
function chunk(text: string, max = 450): string[] {
  if (text.length <= max) return [text];
  const out: string[] = [];
  let buf = "";
  for (const part of text.split(/(?<=[.!?।])\s+/)) {
    if ((buf + " " + part).trim().length > max) {
      if (buf) out.push(buf.trim());
      if (part.length > max) {
        let w = "";
        for (const word of part.split(/\s+/)) {
          if ((w + " " + word).trim().length > max) {
            out.push(w.trim());
            w = word;
          } else w = (w + " " + word).trim();
        }
        buf = w;
      } else buf = part;
    } else buf = (buf + " " + part).trim();
  }
  if (buf) out.push(buf.trim());
  return out;
}

async function translateChunk(text: string, langpair: string, email?: string) {
  const params = new URLSearchParams({ q: text, langpair });
  if (email) params.set("de", email);
  const res = await fetch(
    `https://api.mymemory.translated.net/get?${params.toString()}`,
  );
  const data = await res.json();
  const detail = String(data?.responseDetails || "");
  if (detail.toUpperCase().includes("YOU USED ALL AVAILABLE FREE")) {
    throw new Error("QUOTA");
  }
  return data?.responseData?.translatedText || text;
}

async function translateText(text: string, langpair: string, email?: string) {
  if (!text || !text.trim()) return text;
  const cacheKey = `${langpair}:${text}`;
  const hit = cache.get(cacheKey);
  if (hit !== undefined) return hit;

  const parts = chunk(text);
  const translated: string[] = [];
  for (const part of parts) {
    translated.push(await translateChunk(part, langpair, email));
    if (parts.length > 1) await sleep(250);
  }
  const result = translated.join(" ");
  cache.set(cacheKey, result);
  return result;
}

// Translate many texts with limited concurrency (keeps the free API happy).
async function translateAll(
  texts: string[],
  langpair: string,
  email?: string,
): Promise<string[]> {
  const results = new Array<string>(texts.length);
  const concurrency = 4;
  let i = 0;
  let quotaHit = false;

  async function worker() {
    while (i < texts.length && !quotaHit) {
      const idx = i++;
      try {
        results[idx] = await translateText(texts[idx], langpair, email);
      } catch (err) {
        if (err instanceof Error && err.message === "QUOTA") quotaHit = true;
        results[idx] = texts[idx]; // graceful fallback to English
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, texts.length) }, worker),
  );

  if (quotaHit) throw new Error("QUOTA");
  return results;
}

export async function POST(req: NextRequest) {
  let body: { texts?: unknown; target?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const texts = body.texts;
  if (!Array.isArray(texts) || texts.some((t) => typeof t !== "string")) {
    return NextResponse.json(
      { error: "`texts` must be an array of strings" },
      { status: 400 },
    );
  }

  const target = typeof body.target === "string" ? body.target : "ml";
  const langpair = `en|${target}`;
  const email = process.env.MYMEMORY_EMAIL;

  try {
    const translations = await translateAll(texts as string[], langpair, email);
    return NextResponse.json({ translations });
  } catch (err) {
    if (err instanceof Error && err.message === "QUOTA") {
      return NextResponse.json(
        { error: "Translation quota reached. Please try again later." },
        { status: 429 },
      );
    }
    return NextResponse.json({ error: "Translation failed" }, { status: 502 });
  }
}
