"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { urlFor } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

type Lang = "en" | "ml";

function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// How each Portable Text block is rendered into the page.
const portableComponents: PortableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: SanityImageSource & { asset?: { _ref?: string }; alt?: string };
    }) => {
      // Skip image blocks that don't have a file uploaded yet.
      if (!value?.asset?._ref) return null;
      const url = urlFor(value).width(1000).fit("max").url();
      return (
        <span className="block my-8 rounded-[14px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value.alt || ""} className="w-full h-auto" />
        </span>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif font-black text-[1.6rem] text-ink mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif font-bold text-[1.3rem] text-ink mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-bold text-[1.1rem] text-ink mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-teal pl-5 my-6 italic text-ink-mid">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-ink-mid leading-[1.9] text-[1.02rem] mb-5">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 text-ink-mid leading-[1.9] space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 text-ink-mid leading-[1.9] space-y-1">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-ink">{children}</strong>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal underline underline-offset-2 hover:text-teal-dark"
      >
        {children}
      </a>
    ),
  },
};

type Span = { _type?: string; text?: string };
type Block = { _type?: string; children?: Span[] };

// Pull every translatable text string out of the body, in order.
function collectTexts(body: PortableTextBlock[]): string[] {
  const texts: string[] = [];
  for (const block of body as Block[]) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    for (const span of block.children) {
      if (span._type === "span" && span.text) texts.push(span.text);
    }
  }
  return texts;
}

// Rebuild the body with translated strings slotted back into the same spans.
function applyTexts(
  body: PortableTextBlock[],
  translated: string[],
): PortableTextBlock[] {
  const clone = JSON.parse(JSON.stringify(body)) as Block[];
  let i = 0;
  for (const block of clone) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    for (const span of block.children) {
      if (span._type === "span" && span.text) span.text = translated[i++];
    }
  }
  return clone as PortableTextBlock[];
}

export type ArticleViewProps = {
  title: string;
  body?: PortableTextBlock[];
  coverUrl?: string | null;
  categories?: string[];
  authorName?: string;
  publishedAt?: string;
};

export default function ArticleView({
  title,
  body,
  coverUrl,
  categories,
  authorName,
  publishedAt,
}: ArticleViewProps) {
  const [lang, setLang] = useState<Lang>("en");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  // Cached Malayalam version, translated on demand the first time.
  const [ml, setMl] = useState<{
    title: string;
    body: PortableTextBlock[];
  } | null>(null);

  const canTranslate = Array.isArray(body) && body.length > 0;

  async function showMalayalam() {
    if (ml) {
      setLang("ml");
      return;
    }
    setStatus("loading");
    try {
      const texts = [title, ...(body ? collectTexts(body) : [])];
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts, target: "ml" }),
      });
      if (!res.ok) throw new Error("translate failed");
      const data: { translations: string[] } = await res.json();
      const [mlTitle, ...mlTexts] = data.translations;
      setMl({
        title: mlTitle || title,
        body: body ? applyTexts(body, mlTexts) : [],
      });
      setLang("ml");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  const showMl = lang === "ml" && !!ml;
  const displayTitle = showMl ? ml!.title : title;
  const displayBody = showMl ? ml!.body : body;

  return (
    <article>
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            {categories?.[0] && (
              <span className="inline-block bg-teal-light text-teal text-[0.72rem] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-4">
                {categories[0]}
              </span>
            )}
          </div>

          {canTranslate && (
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div
                className="inline-flex items-center rounded-full bg-beige-mid border border-beige-dark p-0.5 text-[0.5rem] font-bold"
                role="group"
                aria-label="Choose language"
              >
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  aria-pressed={lang === "en"}
                  className={`px-3.5 py-1.5 rounded-full transition-colors ${
                    lang === "en"
                      ? "bg-teal text-white"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={showMalayalam}
                  aria-pressed={lang === "ml"}
                  disabled={status === "loading"}
                  lang="ml"
                  className={`px-3.5 py-1.5 rounded-full transition-colors disabled:opacity-60 ${
                    lang === "ml"
                      ? "bg-teal text-white"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {status === "loading" ? "…" : "മലയാളം"}
                </button>
              </div>
              {status === "loading" && (
                <span className="text-[0.7rem] text-ink-soft">Translating…</span>
              )}
              {status === "error" && (
                <span className="text-[0.7rem] text-red-500">
                  Translation failed — try again
                </span>
              )}
            </div>
          )}
        </div>

        <h1
          lang={showMl ? "ml" : "en"}
          className="font-serif font-black text-[clamp(1.8rem,4vw,2.6rem)] text-ink leading-tight mb-4"
        >
          {displayTitle}
        </h1>
        <div className="flex items-center gap-3 text-[0.85rem] text-ink-soft">
          {authorName && (
            <>
              <span className="font-semibold text-ink">{authorName}</span>
              <span>·</span>
            </>
          )}
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </div>
      </header>

      {coverUrl && (
        <div className="relative aspect-[16/9] rounded-[18px] overflow-hidden mb-10 bg-beige-mid">
          <Image
            src={coverUrl}
            alt={title}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 760px"
            className="object-cover"
          />
        </div>
      )}

      <div className="blog-body" lang={showMl ? "ml" : "en"}>
        {displayBody && displayBody.length > 0 ? (
          <PortableText value={displayBody} components={portableComponents} />
        ) : (
          <p className="text-ink-soft">This post has no content yet.</p>
        )}
      </div>
    </article>
  );
}
