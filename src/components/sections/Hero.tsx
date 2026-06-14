'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Counter from '@/components/ui/Counter';

const appScreens = [
  { src: '/app-screen-1.webp', alt: 'ELK Services Screen' },
  // { src: '/app-screen-2.png', alt: 'ELK Rental Detail Screen' },
  { src: '/app-screen-3.webp', alt: 'ELK Rentals Listing Screen' },
];

const stats = [
  { target: 500, label: 'Active Listings' },
  { target: 300, label: 'Businesses Listed' },
  { target: 50, label: 'Cities Covered' },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % appScreens.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-[100px] pb-16 px-[5%] relative overflow-hidden w-full"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige-mid to-teal-light" />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: -100,
          right: -100,
          background: 'radial-gradient(circle, #1BBFBF 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.35,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          bottom: -80,
          left: '10%',
          background: 'radial-gradient(circle, #F5C518 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.2,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center relative z-10 max-w-[1200px] mx-auto w-full">
        {/* Left content */}
        <div>
          <h1 className="hero-fade-2 font-serif font-black leading-[1.1] text-ink mb-5 text-[clamp(2.4rem,4vw,3.8rem)]">
            The Smart Marketplace for{' '}
            <span className="text-teal">Services</span> and{' '}
            <span className="text-yellow">Rentals</span> in Kannur
          </h1>

          <p className="hero-fade-3 text-[1.05rem] text-ink-soft max-w-[480px] leading-[1.7] mb-9">
            ELK Business Hub is Kannur’s all-in-one platform for local services
            and rentals. Find trusted professionals, compare providers, book
            services, rent vehicles and equipment, and manage everything from a
            single reliable app. Fast, convenient, and designed for the people
            of Kannur.
          </p>

          <div className="hero-fade-4 flex gap-4 flex-wrap">
            <a
              href="#services"
              className="bg-teal text-white px-8 py-3.5 rounded-full font-bold text-[0.95rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-teal-dark hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(27,191,191,0.35)]"
            >
              Explore Platform →
            </a>
            <a
              href="#app"
              className="bg-transparent text-ink px-8 py-3.5 rounded-full font-bold text-[0.95rem] no-underline border-2 border-beige-dark inline-flex items-center gap-2 transition-all hover:border-teal hover:text-teal hover:-translate-y-0.5"
            >
              📱 Get the App
            </a>
          </div>

          <div className="hero-fade-5 flex gap-8 mt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-[1.8rem] font-black text-ink leading-none">
                  <Counter target={s.target} />
                </div>
                <div className="text-[0.78rem] text-ink-soft font-normal mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Phone mockup with rotating screenshots */}
        <div className="hero-visual-anim hidden lg:flex justify-center relative">
          <div
            className="relative"
            style={{
              width: 260,
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))',
            }}
          >
            {/* Phone shell */}
            <div className="bg-ink rounded-[36px] p-3.5 relative">
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-ink"
                style={{ width: 80, height: 20, borderRadius: '0 0 14px 14px' }}
              />
              {/* Screen area */}
              <div
                className="rounded-[24px] overflow-hidden relative"
                style={{ height: 500 }}
              >
                {appScreens.map((screen, i) => (
                  <div
                    key={screen.src}
                    className="absolute inset-0"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transition: 'opacity 0.8s ease-in-out',
                      zIndex: i === active ? 1 : 0,
                    }}
                  >
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      fill
                      sizes="260px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div
            className="float-1 absolute bg-white rounded-[10px] px-4 py-3 shadow-[var(--shadow-card)]"
            style={{ left: -20, top: '20%' }}
          >
            <div className="text-[0.65rem] text-ink-soft font-bold uppercase tracking-[0.06em]">
              RENT NOW
            </div>
          </div>
          <div
            className="float-2 absolute bg-white rounded-[10px] px-4 py-3 shadow-[var(--shadow-card)]"
            style={{ right: -50, bottom: '25%' }}
          >
            <div className="text-[0.65rem] text-ink-soft font-bold uppercase tracking-[0.06em]">
              SERVICE NOW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
