import ScrollReveal from "@/components/ui/ScrollReveal";
import RentalsGrid from "@/components/ui/RentalsGrid";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

const S3_BASE = "https://elk-storage-bucket.s3.ap-south-1.amazonaws.com";

const FEATURED_IDS = [
  "1759920609703901",
  "1770093262317595",
  "1762064611532913",
  "1759671120342710",
];


interface RentalRow extends RowDataPacket {
  ad_id: string;
  title: string;
  category: string;
  image: string | null;
  rent_price: string;
  rent_duration: string;
  locality: string | null;
  place: string | null;
  district: string | null;
  state: string | null;
}

async function getFeaturedRentals(): Promise<RentalRow[]> {
  const ph = FEATURED_IDS.map(() => "?").join(", ");
  const [rows] = await pool.query<RentalRow[]>(
    `SELECT
       a.ad_id, a.title, a.category, a.ad_type, a.ad_status,
       (SELECT image FROM ad_images WHERE ad_id = a.ad_id LIMIT 1) AS image,
       ap.rent_price, ap.rent_duration,
       al.locality, al.place, al.district, al.state
     FROM ads a
     LEFT JOIN ad_price_details ap ON ap.ad_id = a.ad_id
     LEFT JOIN ad_locations    al ON al.ad_id = a.ad_id
     WHERE a.ad_id IN (${ph})
     ORDER BY FIELD(a.ad_id, ${ph})`,
    [...FEATURED_IDS, ...FEATURED_IDS]
  );
  return rows;
}

function buildImageUrl(image: string | null): string | null {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${S3_BASE}/${image}`;
}

function formatPrice(price: string, duration: string): string {
  // Some prices are ranges like "800..1000", some are plain numbers
  const num = parseFloat(price);
  if (!isNaN(num) && price === String(Math.floor(num))) {
    return `₹${num.toLocaleString("en-IN")} / ${duration}`;
  }
  // Range or descriptive — just prefix with ₹ if it starts with a digit
  if (/^\d/.test(price)) return `₹${price}`;
  return price;
}

function formatLocation(row: RentalRow): string {
  return (
    [row.locality, row.place, row.district]
      .filter((v) => v && v.trim() !== "")
      .join(", ") || row.state || ""
  );
}

export default async function Rentals() {
  let rentals: RentalRow[] = [];
  try {
    rentals = await getFeaturedRentals();
  } catch (err) {
    console.error("[Rentals] DB fetch failed:", err);
  }

  return (
    <section id="rentals" className="py-20 px-[5%] bg-beige">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
        {/* Left — text */}
        <ScrollReveal>
          <div className="section-label-line inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3.5">
            Rent Anything
          </div>
          <h2 className="font-serif font-black leading-[1.15] text-ink text-[clamp(1.8rem,3vw,2.8rem)] mb-4">
            Your Dream Ride,
            <br />
            Home & More —
            <br />
            <em className="text-teal not-italic">Just a Click Away</em>
          </h2>
          <p className="text-[1rem] text-ink-soft leading-[1.7] mb-7">
            Browse thousands of rental listings — from luxury cars and sports
            bikes to furnished apartments and event equipment. Best rates,
            verified owners.
          </p>
          <a
            href="#app"
            className="bg-teal text-white px-8 py-3.5 rounded-full font-bold text-[0.95rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-teal-dark hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(27,191,191,0.35)]"
          >
            Browse Rentals →
          </a>
        </ScrollReveal>

        {/* Right — cards grid */}
        <ScrollReveal delay={2}>
          <RentalsGrid
            rentals={rentals.map((r) => ({
              ad_id: r.ad_id,
              title: r.title,
              category: r.category,
              imgUrl: buildImageUrl(r.image),
              price: formatPrice(r.rent_price, r.rent_duration),
              loc: formatLocation(r),
            }))}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
