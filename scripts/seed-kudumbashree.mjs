// Creates the "Kudumbashree & Haritha Mission" post (as a draft) plus its
// category, directly via @sanity/client using the `sanity login` token.
// Safe to delete after the post is created. Run the translate script next.
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createClient } from "@sanity/client";

const cfg = JSON.parse(
  readFileSync(join(homedir(), ".config", "sanity", "config.json"), "utf8"),
);
const client = createClient({
  projectId: "te3uxewd",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: cfg.authToken,
  useCdn: false,
});

let k = 0;
const key = () => `k${(k++).toString(36)}`;
const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const blk = (style, children, extra = {}) => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: extra.markDefs || [],
  children: children.map((c) => (Array.isArray(c) ? span(c[0], c[1] || []) : span(c))),
  ...(extra.listItem ? { listItem: extra.listItem, level: 1 } : {}),
});
const p = (t) => blk("normal", [t]);
const h2 = (t) => blk("h2", [t]);
const h3 = (t) => blk("h3", [t]);
const bullet = (t) => blk("normal", [t], { listItem: "bullet" });
const number = (t) => blk("normal", [t], { listItem: "number" });
const quote = (t) => blk("blockquote", [t]);
const pb = (lead, bold, tail) => blk("normal", [[lead], [bold, ["strong"]], [tail]]);
const img = (d) => quote(`🖼️ IMAGE — ${d}`);
const chart = (d) => quote(`📊 CHART — ${d}`);

const body = [
  quote(
    "⚠️ DRAFT NOTE (delete before publishing): replace every [bracketed] figure with a sourced statistic, and drag your chosen images/charts into the 🖼️/📊 placeholder spots.",
  ),

  p(
    "Across Kerala, a quiet revolution is being led by women — and it runs on two powerful engines: Kudumbashree, the state's vast network of women's neighbourhood groups, and the Haritha Karma Sena, the green army behind the Haritha Keralam Mission. Together they prove a simple truth: when women unite, a clean home, a stable income, and a stronger community can all grow from the same idea.",
  ),
  p(
    "This is the story of how unity becomes income — from segregating waste to running food units, textile shops, and home services — and how a platform like ELK Business Hub can take these businesses online so customers anywhere, including NRIs, can support them directly.",
  ),
  img("Hero: a group of Kudumbashree women smiling together at a community enterprise (warm, natural light, Pinterest-style)"),

  h2("What is Kudumbashree?"),
  p(
    "Kudumbashree is one of the largest women's movements in the world — a network of neighbourhood groups where women save together, lend to each other, and start small businesses as a team. The model is built on three pillars: micro-credit, micro-enterprise, and community action.",
  ),
  pb(
    "With over ",
    "millions of women members across Kerala",
    " [verify with a sourced figure], it turns everyday homemakers into entrepreneurs, leaders, and decision-makers.",
  ),

  h2("The power of the Haritha Mission in Kerala homes"),
  p(
    "The Haritha Keralam Mission brought waste management to every doorstep. Its frontline is the Haritha Karma Sena — trained women who collect non-biodegradable waste from homes and shops for a small monthly user fee.",
  ),
  p(
    "The impact is double: neighbourhoods become cleaner, and the women earn a steady, respectable income. Clean streets and full purses, from the very same work.",
  ),
  bullet("Doorstep collection of plastic, paper, e-waste, and other dry waste"),
  bullet("A small monthly user fee per household funds the workers"),
  bullet("Collected material is sorted and sent for recycling"),
  bullet("Homes stay clean; women earn with dignity"),
  img("Haritha Karma Sena worker in green uniform collecting segregated waste at a doorstep"),

  h2("Turning waste into money"),
  p(
    "The secret is segregation. When every home separates wet waste from dry, waste stops being garbage and becomes a resource. Wet waste becomes compost for gardens; dry waste — plastic, paper, metal, glass — has real recycling value.",
  ),
  pb(
    "Properly segregated and collected, waste can generate ",
    "lakhs of rupees a year for a single local unit",
    " [illustrative — replace with a real figure], while keeping the whole ward clean.",
  ),
  chart("Income from waste collection & recycling per ward, per year (bar chart)"),
  h3("From bin to income — the simple cycle"),
  number("Households segregate wet and dry waste"),
  number("Haritha Karma Sena collects dry waste for a small fee"),
  number("Material is sorted: plastic, paper, metal, glass, e-waste"),
  number("Recyclables are sold; wet waste becomes compost"),
  number("Earnings flow back to the women and the community"),

  h2("Unity is the real strategy"),
  p(
    "No single woman has to carry the risk alone. By pooling savings, sharing work, and starting enterprises as a group, Kudumbashree turns unity into a business strategy. One person's idea becomes ten people's livelihood.",
  ),
  quote(
    "Alone we can clean a house. Together we can clean a state — and earn while doing it.",
  ),

  h2("Business ideas by women — small scale to big scale"),
  p(
    "Kudumbashree units run an incredible variety of enterprises. Here are proven ideas, from tiny home starts to growing brands:",
  ),
  number("Janakeeya Hotels & catering — tasty, affordable home-style meals"),
  number("Pickles, snacks, and ready-to-cook food units"),
  number("Nutrimix and packaged food production"),
  number("Tailoring, textiles, and cloth shops"),
  number("Soap, detergent, and phenyl making"),
  number("Umbrella, bag, and handicraft units"),
  number("Doorstep waste collection & recycling (Haritha Karma Sena)"),
  number("Home cleaning, deep-cleaning, and sanitation services"),
  number("Organic vegetables and terrace farming"),
  number("Event catering and festival food stalls"),
  img("Flat-lay grid of women-made products: pickles, cloth, soaps, snacks (Pinterest-style, neat)"),

  h2("From a small kitchen to a real brand"),
  p(
    "Many Kerala success stories began at a kitchen table: a few women making pickles or stitching clothes, reinvesting profits, and slowly growing into registered brands with shops and online orders. Small scale is just the first chapter — not the whole book.",
  ),
  chart("Growth journey: revenue from year 1 to year 5 for a typical unit (line chart)"),

  h2("Women and money management"),
  p(
    "Kudumbashree is also a school of financial discipline. Weekly thrift (savings), group lending, and simple bookkeeping teach women to manage money with confidence — skills that strengthen the whole family.",
  ),
  bullet("Regular small savings build a safety net"),
  bullet("Internal lending avoids high-interest debt"),
  bullet("Profit is shared fairly and partly reinvested"),
  bullet("Financial literacy passes on to the next generation"),

  h2("Gen Z in Kudumbashree"),
  p(
    "A new generation is joining in. Young women bring phones, design skills, and social media — taking family units online, building brands, and reaching customers far beyond the neighbourhood. Tradition meets technology, and both win.",
  ),

  h2("Family support, respect, and harmony"),
  p(
    "These enterprises thrive when families back them. A supportive home — sharing chores, encouraging the work — multiplies what a woman can achieve. In return, her income and confidence bring new respect and harmony to the household and the wider society.",
  ),

  h2("Taking Kudumbashree & Haritha businesses online with ELK Business Hub"),
  p(
    "The biggest opportunity now is going digital. With ELK Business Hub, a Kudumbashree unit or a Haritha Karma Sena team can put its products and services online — discoverable on any mobile phone, open to the whole world.",
  ),
  bullet("List food, textiles, and handmade products for direct sale"),
  bullet("Offer services like cleaning, catering, and tailoring with online booking"),
  bullet("Let NRIs order products or sponsor services for family back home"),
  bullet("Accept payments digitally — no shopfront required"),
  bullet("Build a simple brand page that lives in the customer's pocket"),
  blk("normal", [["See how local enterprises can grow on the "], ["ELK platform", ["link0"]], ["."]], {
    markDefs: [{ _type: "link", _key: "link0", href: "/" }],
  }),

  h2("App idea: collection scheduling, slot booking & business charts"),
  p(
    "Imagine the Haritha Mission and Kudumbashree powered by one simple app on ELK Business Hub:",
  ),
  bullet("Households book a waste-collection slot in a tap"),
  bullet("Workers see their daily route and collection schedule"),
  bullet("Customers order food or services and pick a delivery slot"),
  bullet("Each unit gets a dashboard: sales, collection volume, and income charts"),
  bullet("NRIs pay online and track the service for their family"),
  chart("App dashboard mockup: collections, orders, and monthly income (dashboard chart)"),

  h2("A cleaner, stronger, self-made Kerala"),
  p(
    "Put it all together and a beautiful cycle appears: women unite, waste becomes wealth, homes stay clean, families grow stronger, and a whole state earns its way to a better future. With the right digital platform, that future is just a tap away.",
  ),
  quote(
    "When women lead with unity, a clean home and a thriving business are not two dreams — they are one.",
  ),
];

const category = {
  _id: "category-women-enterprise",
  _type: "category",
  title: "Women & Enterprise",
  slug: { _type: "slug", current: "women-enterprise" },
  description:
    "Stories of women-led businesses, Kudumbashree, and community enterprise across Kerala.",
};

const post = {
  _id: "drafts.post-kudumbashree-haritha-women-empowerment",
  _type: "post",
  title:
    "Women Power in Kerala: How Kudumbashree & the Haritha Mission Turn Unity Into Income",
  slug: {
    _type: "slug",
    current: "kudumbashree-haritha-mission-kerala-women-empowerment",
  },
  excerpt:
    "From doorstep waste collection to food units, textiles, and home services — discover how Kerala's women turn unity into income through Kudumbashree and the Haritha Mission, and how ELK Business Hub can take their businesses online for customers and NRIs.",
  publishedAt: new Date().toISOString(),
  author: { _type: "reference", _ref: "author-elk-editorial" },
  categories: [{ _type: "reference", _key: key(), _ref: "category-women-enterprise" }],
  body,
};

const run = async () => {
  await client.createOrReplace(category);
  console.log("✓ category:", category._id);
  await client.createOrReplace(post);
  console.log("✓ draft post:", post._id);
  console.log("Body blocks:", body.length);
  console.log("\nDone. Next: translate, then review & Publish in /studio.");
};

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
