import ScrollReveal from "@/components/ui/ScrollReveal";
import RentalsGrid from "@/components/ui/RentalsGrid";
import ListNowButton from "@/components/ui/ListNowButton";
import Button from "@/components/ui/Button";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

const S3_BASE = "https://elk-storage-bucket.s3.ap-south-1.amazonaws.com";

const FEATURED_IDS = [
  "1775801766773793",
  "1770093262317595",
  "1775812920593336",
  "1775892676504987",
  "1777430637950745",
  "1775814503962742",
  "1775813988143438",
  "1776316243755247",
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
     ORDER BY RAND()`,
    FEATURED_IDS
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
          <div className="flex gap-4 flex-wrap">
            <Button href="#app">Browse Rentals →</Button>
            <ListNowButton />
          </div>
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
