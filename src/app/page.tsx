import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Services from "@/components/sections/Services";
import Rentals from "@/components/sections/Rentals";
import Advertise from "@/components/sections/Advertise";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import AppDownload from "@/components/sections/AppDownload";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeSection />
        <Services />
        <Rentals />
        <Advertise />
        <HowItWorks />
        {/* <Invest /> */}
        <Testimonials />
        <About />
        <Team />
        <AppDownload />
      </main>
      <Footer />
    </>
  );
}
