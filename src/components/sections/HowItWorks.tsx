import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  { icon: "📍", title: "Set Your Location", desc: "Choose your city or neighbourhood to discover nearby services and rental listings instantly." },
  { icon: "🔍", title: "Search & Discover", desc: "Browse categories, compare prices, read reviews, and find exactly what you need." },
  { icon: "📞", title: "Connect & Book", desc: "Contact providers, book rentals, or make service appointments — all within the app." },
  { icon: "⭐", title: "Review & Grow", desc: "Rate your experience, build trust, and help your community make better decisions." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-[5%] bg-white">
      <ScrollReveal className="text-center">
        <div className="section-label-line inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3.5">
          Simple Process
        </div>
        <h2 className="font-serif font-black leading-[1.15] text-ink text-[clamp(1.8rem,3vw,2.8rem)] mb-4">
          How ELK Works
        </h2>
        <p className="text-[1rem] text-ink-soft max-w-[580px] mx-auto leading-[1.7]">
          Three simple steps to find services, rent products, or grow your business on our platform.
        </p>
      </ScrollReveal>

      <ScrollReveal className="steps-line grid grid-cols-2 md:grid-cols-4 gap-0 mt-12 relative">
        {steps.map((s) => (
          <div key={s.title} className="flex flex-col items-center text-center px-5 relative z-10">
            <div className="w-[72px] h-[72px] rounded-full bg-beige border-[3px] border-teal flex items-center justify-center text-2xl mb-5 transition-all hover:bg-teal hover:scale-110 cursor-default">
              {s.icon}
            </div>
            <div className="font-bold text-[0.95rem] text-ink mb-2">{s.title}</div>
            <div className="text-[0.8rem] text-ink-soft leading-[1.6]">{s.desc}</div>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
