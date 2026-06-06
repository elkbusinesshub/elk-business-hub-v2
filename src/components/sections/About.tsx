import ScrollReveal from "@/components/ui/ScrollReveal";

const values = [
  "Trust & Transparency",
  "Empowering Local Entrepreneurs",
  "Innovation in Every Category",
  "Community-First Growth",
];

export default function About() {
  return (
    <section id="about" className="py-20 px-[5%] bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Visual cards */}
        <ScrollReveal>
          <div className="relative h-[420px] max-sm:h-auto max-sm:flex max-sm:flex-col max-sm:gap-4">
            <div
              className="absolute max-sm:relative left-0 top-0 max-sm:w-full bg-teal rounded-[18px] p-9 text-white"
              style={{ width: "75%", height: 260 }}
            >
              <h3 className="font-serif font-bold text-[1.3rem] mb-2.5">Our Mission</h3>
              <p className="text-[0.85rem] opacity-85 leading-[1.6]">
                To democratise commerce in India by connecting every service
                provider, rental business, and customer on a single, trusted
                digital platform — empowering entrepreneurs to grow their income
                and reach.
              </p>
              <div className="flex gap-5 mt-5">
                {[
                  { val: "2022", lbl: "Founded" },
                  { val: "50+", lbl: "Cities" },
                  { val: "100+", lbl: "Businesses" },
                ].map((s) => (
                  <div key={s.lbl}>
                    <div className="text-2xl font-black">{s.val}</div>
                    <div className="text-[0.75rem] opacity-80">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="absolute max-sm:relative right-0 bottom-0 max-sm:w-full bg-beige rounded-[18px] p-7 border-2 border-beige-dark"
              style={{ width: "65%", height: 200 }}
            >
              <h4 className="font-bold text-[0.9rem] text-ink mb-3">Our Values</h4>
              <div className="flex flex-col gap-2">
                {values.map((v) => (
                  <div key={v} className="about-value flex items-center text-[0.82rem] text-ink-mid">
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal delay={2}>
          <div className="section-label-line inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3.5">
            Who We Are
          </div>
          <h2 className="font-serif font-black leading-[1.15] text-ink text-[clamp(1.8rem,3vw,2.8rem)] mb-6">
            Your Business
            <br />
            Growth Partner
          </h2>
          <p className="text-[1rem] text-ink-soft leading-[1.7] mb-6">
            ELK Business Hub was founded with a bold vision: make it effortless
            for every Indian business — big or small — to find customers, rent
            their assets, and advertise their services online.
          </p>
          <p className="text-[1rem] text-ink-soft leading-[1.7] mb-8">
            We&apos;re more than a marketplace. We&apos;re your digital growth engine
            — combining powerful technology with deep local knowledge to help
            businesses thrive in the digital age.
          </p>

          <div className="flex gap-4 flex-wrap">
            {/* <div className="bg-teal-light rounded-[10px] px-5 py-4 text-center">
              <div className="text-[1.4rem] font-black text-teal">₹82K</div>
              <div className="text-[0.75rem] text-ink-soft">Avg. Monthly Earnings</div>
            </div> */}
            <div className="bg-yellow-light rounded-[10px] px-5 py-4 text-center">
              <div className="text-[1.4rem] font-black" style={{ color: "#b08000" }}>
                4.8 ★
              </div>
              <div className="text-[0.75rem] text-ink-soft">App Store Rating</div>
            </div>
            <div className="bg-beige-mid rounded-[10px] px-5 py-4 text-center">
              <div className="text-[1.4rem] font-black text-ink">100+</div>
              <div className="text-[0.75rem] text-ink-soft">App Downloads</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
