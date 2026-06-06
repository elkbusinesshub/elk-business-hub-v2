const items = [
  "Vehicle Rentals",
  "Home Services",
  "Property Listings",
  "Job Marketplace",
  "Business Ads",
  "Electronics Rental",
  "Salon & Beauty",
  "Carpentry",
  "Plumbing",
  "Laundry",
  "Painting",
  "Catering",
];

export default function MarqueeSection() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-teal py-3.5 overflow-hidden whitespace-nowrap">
      <div className="marquee-track inline-flex gap-12">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[0.8rem] font-bold text-white tracking-[0.08em] uppercase inline-flex items-center gap-3.5 after:content-['◆'] after:text-[0.5rem] after:opacity-60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
