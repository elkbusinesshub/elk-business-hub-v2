import { NextResponse } from "next/server";
import pool from "@/lib/db";

// The 4 featured rental ad_ids
const FEATURED_IDS = [
  "1759920609703901",
  "1770093262317595",
  "1762064611532913",
  "1759671120342710",
];

export async function GET() {
  try {
    const placeholders = FEATURED_IDS.map(() => "?").join(", ");

    const [rows] = await pool.query(
      `SELECT
         a.ad_id,
         a.title,
         a.category,
         a.ad_type,
         a.ad_status,
         (SELECT image FROM ad_images WHERE ad_id = a.ad_id LIMIT 1) AS image,
         ap.rent_price,
         ap.rent_duration,
         al.locality,
         al.place,
         al.district,
         al.state
       FROM ads a
       LEFT JOIN ad_price_details ap ON ap.ad_id = a.ad_id
       LEFT JOIN ad_locations    al ON al.ad_id = a.ad_id
       WHERE a.ad_id IN (${placeholders})
       ORDER BY FIELD(a.ad_id, ${placeholders})`,
      [...FEATURED_IDS, ...FEATURED_IDS] // placeholders × 2 (WHERE + ORDER BY)
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("[featured-rentals] DB error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
}
