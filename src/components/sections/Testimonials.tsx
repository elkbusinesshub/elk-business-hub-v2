import ScrollReveal from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    stars: 5,
    text: "I listed my two cars on ELK and started earning within the first week. The platform is incredibly easy to use and the customer support team is always available.",
    initials: "RK",
    name: "Rajesh Kumar",
    role: "Car Rental Owner · Kochi",
    avatarStyle: { background: "linear-gradient(135deg,#1BBFBF,#0fa0a0)" },
  },
  {
    stars: 5,
    text: "As a cleaning service provider, ELK gave me access to hundreds of clients I would never have reached on my own. My business grew 3x in four months.",
    initials: "SN",
    name: "Sunita Nair",
    role: "Bay Leaf Cleaning · Palakkad",
    avatarStyle: { background: "linear-gradient(135deg,#F5C518,#e0a800)" },
  },
  {
    stars: 5,
    text: "I'm an NRI based in Dubai. ELK lets me manage my apartment listing in Bengaluru completely online. Hassle-free, reliable, and the earnings are consistently good.",
    initials: "AM",
    name: "Arjun Menon",
    role: "Property Owner · Dubai / Bengaluru",
    avatarStyle: { background: "linear-gradient(135deg,#9b59b6,#6c3483)" },
  },
  {
    stars: 5,
    text: "Finding a reliable electrician used to take days. With ELK I booked one in under 10 minutes. The work was done same day — absolutely brilliant service.",
    initials: "PV",
    name: "Priya Varma",
    role: "Homeowner · Thrissur",
    avatarStyle: { background: "linear-gradient(135deg,#e74c3c,#c0392b)" },
  },
  {
    stars: 4,
    text: "I run a small tiffin service and ELK helped me reach customers in three nearby localities. Orders doubled in two months and managing everything on the app is super easy.",
    initials: "FM",
    name: "Fathima M",
    role: "Home Cook · Kozhikode",
    avatarStyle: { background: "linear-gradient(135deg,#27ae60,#1e8449)" },
  },
  {
    stars: 5,
    text: "We rented a furnished apartment through ELK for our team relocating to Kochi. The listing details were accurate, the owner was responsive, and check-in was seamless.",
    initials: "VT",
    name: "Vineeth Thomas",
    role: "Startup Founder · Kochi",
    avatarStyle: { background: "linear-gradient(135deg,#e67e22,#ca6f1e)" },
  },
];

function Card({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className="flex-shrink-0 w-[300px] bg-white rounded-[18px] p-7 shadow-[var(--shadow-soft)] relative">
      <span
        className="absolute top-4 right-5 font-serif font-black text-teal-light leading-none select-none pointer-events-none"
        style={{ fontSize: "4rem" }}
      >
        &ldquo;
      </span>
      <div className="text-yellow text-[0.85rem] mb-3.5">{"★".repeat(t.stars)}</div>
      <p className="text-[0.88rem] text-ink-mid leading-[1.7] mb-5 italic">{t.text}</p>
      <div className="flex items-center gap-3">
        <div
          className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white font-black text-[0.9rem] flex-shrink-0"
          style={t.avatarStyle}
        >
          {t.initials}
        </div>
        <div>
          <div className="font-bold text-[0.85rem] text-ink">{t.name}</div>
          <div className="text-[0.75rem] text-ink-soft">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-beige overflow-hidden">
      <ScrollReveal className="text-center px-[5%]">
        <div className="section-label-line inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3.5">
          Real Stories
        </div>
        <h2 className="font-serif font-black leading-[1.15] text-ink text-[clamp(1.8rem,3vw,2.8rem)]">
          Businesses Growing
          <br />
          With ELK
        </h2>
      </ScrollReveal>

      {/* Auto-scrolling track — duplicated for seamless loop */}
      <div className="mt-12 overflow-hidden">
        <div
          className="marquee-track flex gap-5"
          style={{ width: "max-content" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
