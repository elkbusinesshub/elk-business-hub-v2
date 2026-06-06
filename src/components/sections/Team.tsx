import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Team() {
  return (
    <section id="team" className="py-20 px-[5%] bg-beige">
      <ScrollReveal className="text-center">
        <div className="section-label-line inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3.5">
          Message from our Founder
        </div>
      </ScrollReveal>

      <ScrollReveal className="flex justify-center mt-10">
        <div className="relative bg-white rounded-[24px] px-10 py-12 max-w-[680px] w-full shadow-[var(--shadow-card)]">

          {/* Opening quote mark */}
          <div
            className="text-[6rem] leading-none text-teal/20 font-serif font-black absolute -top-4 left-8 select-none"
            aria-hidden
          >
            &ldquo;
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[1.3rem] tracking-[0.12em] text-center">
              The future of business is out of this world.
            </div>
            <div className="flex flex-col items-end">
              <div className="font-bold text-[1rem] text-ink">Jimson PS</div>
              <div className="text-[0.8rem] text-teal font-bold uppercase tracking-[0.08em]">
                Founder &amp; CEO
              </div>
            </div>
          </div>

          {/* Closing quote mark */}
          <div
            className="text-[6rem] leading-none text-teal/20 font-serif font-black absolute -bottom-10 right-8 select-none"
            aria-hidden
          >
            &rdquo;
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
