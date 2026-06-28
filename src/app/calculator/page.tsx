import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import RentBuyCalculator from "@/components/sections/RentBuyCalculator";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator – ELK Business Hub",
  description:
    "Compare the true cost of renting an item versus buying it — factoring in depreciation, maintenance, and resale value.",
  alternates: { canonical: "/calculator" },
};


export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-[5%] bg-beige min-h-screen">
        <div className="max-w-[960px] mx-auto">
          {/* Header */}
          <div className="mb-8 pt-6">
            <div className="section-label-line inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3">
              Rent vs Buy
            </div>
            <h1 className="font-serif font-black leading-[1.15] text-ink text-[clamp(1.9rem,3.5vw,2.8rem)]">
              Should you rent it or buy it?
            </h1>
            <p className="text-[1rem] text-ink-soft leading-[1.7] mt-3 max-w-[640px]">
              Tell us what you need and how long you need it — we&apos;ll show you in seconds
              whether renting on Elk or buying it outright costs you less.
            </p>
          </div>

          {/* Calculator */}
          <RentBuyCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
