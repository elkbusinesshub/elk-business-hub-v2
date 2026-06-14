'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AdvertiseModal from '@/components/ui/AdvertiseModal';

const features = [
  {
    icon: '📢',
    title: 'Targeted Business',
    desc: 'Reach the right audience by location, interest, and category. Your ad, your rules.',
  },
  {
    icon: '🪟',
    title: 'Online Shop Listing',
    desc: 'Create your digital storefront with photos, services, reviews, and booking options.',
  },
  {
    icon: '📊',
    title: 'Real-Time Analytics',
    desc: 'Track views, inquiries, and conversions. Know exactly how your ad is performing.',
  },
];

const packages = [
  { name: 'Starter', price: 'Free', desc: '1 listing · Basic visibility', featured: false },
  { name: 'Growth', price: '₹999 /mo', desc: '5 listings · Priority placement', featured: false },
  {
    name: '🔥 Business Pro – Most Popular',
    price: '₹2,499 /mo',
    desc: 'Unlimited listings · Featured ads · Analytics · Dedicated support · Multi-city reach',
    featured: true,
  },
];

export default function Advertise() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="advertise"
        className="py-20 px-[5%] relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2a2a2a 100%)', color: 'white' }}
      >
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            top: -100,
            right: -100,
            background: 'radial-gradient(circle, #1BBFBF 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.1,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center relative z-10">
          <ScrollReveal>
            <div
              className="section-label-line inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] mb-3.5"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Grow With ELK
            </div>
            <h2 className="font-serif font-black leading-[1.15] text-[clamp(1.8rem,3vw,2.6rem)] mb-4">
              Your Business Deserves
              <br />a <span className="text-teal">Spotlight</span>
            </h2>
            <p className="text-[1rem] leading-[1.7] mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Promote your business, create digital ads, and reach thousands of
              potential customers in your city — or across the globe.
            </p>

            <div className="flex flex-col gap-4 mb-9">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3.5">
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center text-base flex-shrink-0"
                    style={{
                      background: 'rgba(27,191,191,0.15)',
                      border: '1px solid rgba(27,191,191,0.3)',
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[0.9rem] mb-0.5 text-white">{f.title}</h3>
                    <p className="text-[0.8rem] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="bg-teal text-white px-8 py-3.5 rounded-full font-bold text-[0.95rem] inline-flex items-center gap-2 transition-all hover:bg-teal-dark hover:-translate-y-0.5 cursor-pointer"
            >
              Start Advertising →
            </button>
          </ScrollReveal>

          <ScrollReveal delay={2} className="grid grid-cols-2 gap-3.5">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`rounded-[18px] p-6 transition-all ${
                  p.featured ? 'col-span-2 bg-teal' : 'border hover:border-teal'
                }`}
                style={
                  p.featured
                    ? {}
                    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
                }
              >
                <div className="text-[0.75rem] font-bold uppercase tracking-[0.08em] mb-2" style={{ opacity: p.featured ? 1 : 0.7 }}>
                  {p.name}
                </div>
                <div className="text-[1.5rem] font-black">{p.price}</div>
                <div className="text-[0.78rem] mt-1" style={{ opacity: 0.7 }}>{p.desc}</div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <AdvertiseModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
