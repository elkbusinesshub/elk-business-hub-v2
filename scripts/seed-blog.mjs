// One-off generator: builds JSON docs for a starter blog post and writes them
// to ./scripts/_seed/*.json so they can be created via `sanity documents create`.
// Safe to delete this file (and ./scripts/_seed) after the post is created.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "_seed");
mkdirSync(outDir, { recursive: true });

let k = 0;
const key = () => `k${(k++).toString(36)}`;

// --- Portable Text helpers ---
const span = (text, marks = []) => ({
  _type: "span",
  _key: key(),
  text,
  marks,
});

// block with rich children: pass array of [text, marks?]
const block = (style, children, extra = {}) => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: extra.markDefs || [],
  children: children.map((c) =>
    Array.isArray(c) ? span(c[0], c[1] || []) : span(c),
  ),
  ...(extra.listItem ? { listItem: extra.listItem, level: 1 } : {}),
});

const p = (text) => block("normal", [text]);
const h2 = (text) => block("h2", [text]);
const h3 = (text) => block("h3", [text]);
const quote = (text) => block("blockquote", [text]);
const bullet = (text) => block("normal", [text], { listItem: "bullet" });
const number = (text) => block("normal", [text], { listItem: "number" });

// A "rich" paragraph where part of the text is bold.
const pb = (lead, bold, tail) =>
  block("normal", [[lead], [bold, ["strong"]], [tail]]);

// Visible placeholder markers the editor will replace in the Studio.
const img = (desc) => quote(`🖼️ IMAGE — ${desc}`);
const chart = (desc) => quote(`📊 CHART — ${desc}`);

const body = [
  quote(
    "⚠️ DRAFT NOTE (delete before publishing): replace every [bracketed] figure with a real, cited statistic, and drag your chosen images/charts into the 🖼️/📊 placeholder spots.",
  ),

  p(
    "Something quiet but powerful is changing the way India spends money. Instead of buying things we use once or twice, more of us are choosing to rent — from wedding décor and power tools to cameras, furniture, and party supplies. The logic is simple: why pay full price to own something you'll touch for a single day?",
  ),
  p(
    "This shift from owning to accessing is the heart of the rental economy, and few states are embracing it as naturally as Kerala. Here's how the trend is growing, why people are increasingly comfortable with it, and how it's quietly creating income, savings, and small-business opportunities — especially for women and first-time entrepreneurs.",
  ),

  h2("Why renting is booming across India"),
  p(
    "Three forces are pushing the rental habit into the mainstream: cost, convenience, and consciousness. Renting frees up cash, removes the burden of storage and maintenance, and cuts down on waste from things bought and forgotten.",
  ),
  pb(
    "Industry estimates suggest India's organised rental and ",
    "subscription economy is growing at a strong double-digit rate every year",
    " [verify with a sourced figure], led by electronics, furniture, vehicles, and event supplies.",
  ),
  chart("India rental market size, year-on-year growth (bar chart, last 5 years)"),
  img(
    "Flat-lay / Pinterest-style hero: neatly arranged rentable items (camera, party lights, décor, tools) on a warm beige background",
  ),

  h2("Are people actually okay with renting?"),
  p(
    "For a long time, ownership was a status symbol in India. That mindset is softening fast — especially among younger and value-conscious buyers who see renting as smart, not second-best.",
  ),
  bullet(
    "Roughly [X]% of urban millennials say they'd rather rent high-cost, occasional-use items than buy them [verify].",
  ),
  bullet(
    "Around [X]% of renters cite saving money as their main reason; [X]% mention avoiding clutter and storage [verify].",
  ),
  bullet(
    "Trust grows when a platform handles quality, delivery, and returns — which is exactly the gap local platforms are filling.",
  ),
  chart("Survey: top reasons people choose renting over buying (pie chart)"),

  h2("Kerala is quietly leading the way"),
  p(
    "Kerala has the right ingredients for a thriving rental culture: high literacy, strong community networks, a vibrant festival and wedding calendar, and a long tradition of cooperative, self-help enterprise such as Kudumbashree.",
  ),
  p(
    "From Onam celebrations to weddings and house functions, Keralites regularly need premium items for just a few days. Renting fits this rhythm perfectly — you get the quality you want, only when you need it, without the long-term cost.",
  ),
  img(
    "Warm Kerala home or Onam setting with rented décor, traditional lamps and seating (Pinterest-style, soft natural light)",
  ),

  h2("The biggest saver: weddings and events"),
  p(
    "Weddings are where the rent-vs-buy maths becomes impossible to ignore. So many costly items are needed for a single day — and then never used again.",
  ),
  pb(
    "A family can comfortably save ",
    "tens of thousands of rupees per event",
    " by renting instead of buying décor, lighting, furniture, and outfits [illustrative — replace with a real example].",
  ),
  h3("Rent vs buy — a one-day wedding (illustrative)"),
  bullet("Décor & stage setup — Buy ₹[—] · Rent ₹[—] · Save [X]%"),
  bullet("Lighting & sound — Buy ₹[—] · Rent ₹[—] · Save [X]%"),
  bullet("Furniture & seating — Buy ₹[—] · Rent ₹[—] · Save [X]%"),
  bullet("Outfits & jewellery — Buy ₹[—] · Rent ₹[—] · Save [X]%"),
  chart("Rent vs Buy total cost for a wedding (grouped bar chart)"),

  h2("Home services on demand"),
  p(
    "The same access-over-ownership idea powers the home-services boom. Instead of struggling with one-off jobs, people now book trusted help for cleaning, repairs, painting, plumbing, and maintenance — on demand, through a single platform.",
  ),
  bullet("Deep cleaning before festivals and functions"),
  bullet("Appliance and electrical repairs"),
  bullet("Plumbing, carpentry, and quick fixes"),
  bullet("Move-in / move-out and post-event cleanup"),

  h2("Earning from what you already own"),
  p(
    "Renting isn't only about saving — it's about earning. Idle items in your home are sleeping money: a camera, a sound system, tools, extra furniture, even festival décor can generate income when you rent them out.",
  ),
  pb(
    "This is the ",
    "money-regeneration mindset",
    ": instead of one-time spending, an asset you already own keeps paying you back, month after month.",
  ),
  img(
    "Clean grid of everyday items that can earn money when rented (Pinterest-style icon collage)",
  ),

  h2("Women, micro-entrepreneurship, and ELK"),
  p(
    "Some of the most exciting growth comes from women turning everyday skills into small businesses — offering cleaning and repair services, tailoring, catering, or renting out equipment, all through a platform that handles discovery and payments.",
  ),
  p(
    "Kerala's strong women's collectives make this especially powerful. With a platform like ELK Business Hub, a home-run service can reach customers across the neighbourhood without a shop, a website, or a big marketing budget — lowering the barrier to financial independence.",
  ),
  chart("Share of new micro-businesses started by women, by sector (bar chart)"),

  h2("Rental adoption by sector (illustrative)"),
  p(
    "Different sectors are adopting renting at different speeds. Replace the figures below with sourced data before publishing:",
  ),
  bullet("Event & wedding supplies — ~[X]% of buyers now rent [verify]"),
  bullet("Furniture & appliances — ~[X]% [verify]"),
  bullet("Electronics & cameras — ~[X]% [verify]"),
  bullet("Tools & equipment — ~[X]% [verify]"),
  bullet("Vehicles & mobility — ~[X]% [verify]"),
  chart("Rental adoption rate by sector (horizontal bar chart)"),

  h2("12 small, low-cost rental & service ideas to start today"),
  p(
    "Perfect for middle-aged and first-time entrepreneurs who want to start small, with low risk and items many people already have:",
  ),
  number("Wedding & party décor rentals"),
  number("Camera, drone, and lighting gear rentals"),
  number("Power tools and DIY equipment library"),
  number("Furniture and appliance rentals for tenants and students"),
  number("Sound systems and projectors for events"),
  number("Traditional outfits and jewellery rentals"),
  number("Home deep-cleaning service"),
  number("Appliance and electrical repair service"),
  number("Tailoring and alteration service"),
  number("Catering and tiffin service for functions"),
  number("Kids' party kits (games, costumes, props)"),
  number("Plant, pot, and garden-tool rentals for events"),

  h2("From saving to financial stability"),
  p(
    "Put it together and a healthy cycle appears: rent what you rarely use, earn from what you own, and reinvest the savings into a small service or rental business. Spending less and earning more — even modestly — is how everyday families build real financial stability.",
  ),

  h2("How ELK Business Hub fits in"),
  p(
    "ELK Business Hub brings renters, owners, and service providers together in one trusted marketplace — so you can rent what you need, list what you own, and offer your skills to your community, all from your phone.",
  ),
  block("normal", [["Explore what's possible on the "], ["ELK platform", ["link0"]], ["."]], {
    markDefs: [{ _type: "link", _key: "link0", href: "/" }],
  }),

  quote(
    "The future isn't about owning more. It's about accessing what you need, earning from what you have, and keeping money moving in your community.",
  ),
];

const category = {
  _id: "category-rental-economy",
  _type: "category",
  title: "Rental Economy",
  slug: { _type: "slug", current: "rental-economy" },
  description:
    "Stories and ideas about renting, the access economy, and earning from what you own.",
};

const author = {
  _id: "author-elk-editorial",
  _type: "author",
  name: "ELK Editorial",
  slug: { _type: "slug", current: "elk-editorial" },
  bio: "Insights from the ELK Business Hub team on renting, hiring, and growing small businesses across Kerala.",
};

const post = {
  // `drafts.` prefix => unpublished draft. It won't show on /blog until you
  // open the Studio and click Publish.
  _id: "drafts.post-rental-revolution-india-kerala",
  _type: "post",
  title:
    "The Rental Revolution: How India and Kerala Are Saving Money by Renting Instead of Buying",
  slug: {
    _type: "slug",
    current: "rental-revolution-india-kerala-saving-money",
  },
  excerpt:
    "From wedding décor to power tools, Indians are renting more and buying less. Here's how the rental economy is reshaping Kerala, creating small-business income, empowering women — plus 12 low-cost rental ideas you can start today.",
  publishedAt: new Date().toISOString(),
  author: { _type: "reference", _ref: "author-elk-editorial" },
  categories: [
    { _type: "reference", _key: key(), _ref: "category-rental-economy" },
  ],
  body,
};

writeFileSync(join(outDir, "category.json"), JSON.stringify(category, null, 2));
writeFileSync(join(outDir, "author.json"), JSON.stringify(author, null, 2));
writeFileSync(join(outDir, "post.json"), JSON.stringify(post, null, 2));

console.log("Wrote 3 docs to", outDir);
console.log("Body block count:", body.length);
