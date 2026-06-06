'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ServiceModal from '@/components/ui/ServiceModal';

const services = [
  {
    icon: '🔧',
    name: 'Repairing',
    desc: 'Appliances, electronics, vehicles — get certified repair experts at your door.',
  },
  {
    icon: '🧹',
    name: 'Cleaning',
    desc: 'Deep cleaning, post-event cleanup, commercial & residential solutions.',
  },
  {
    icon: '🪣',
    name: 'Plumbing',
    desc: 'Leaks, installation, emergency call-outs. Licensed plumbers, fast response.',
  },
  {
    icon: '⚡',
    name: 'Electrician',
    desc: 'Wiring, installation, safety audits — certified professionals only.',
  },
  {
    icon: '🎨',
    name: 'Painting',
    desc: 'Interior, exterior, commercial murals — transform your space beautifully.',
  },
  {
    icon: '🪚',
    name: 'Carpentry',
    desc: 'Custom furniture, repairs, modular kitchens — skilled craftsmen.',
  },
  {
    icon: '👗',
    name: 'Laundry',
    desc: 'Wash, dry, iron, deliver — premium laundry pick-up services.',
  },
  {
    icon: '✂️',
    name: 'Saloon & Beauty',
    desc: 'Top rated salons, at-home beauty services, grooming packages.',
  },
  {
    icon: '📚',
    name: 'Tuition',
    desc: 'Home tutors, online classes, skill workshops across all subjects.',
  },
  {
    icon: '🍱',
    name: 'Home Cooking',
    desc: 'Homemade meals, tiffin services, event catering — fresh & healthy.',
  },
  {
    icon: '🏥',
    name: 'Healthcare',
    desc: 'Nurses, physiotherapists, diagnostic pickups at your home.',
  },
  {
    icon: '💼',
    name: 'Jobs & Hiring',
    desc: 'Post jobs, find talent — hyperlocal employment marketplace.',
  },
];

type Service = { icon: string; name: string };

export default function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-20 px-[5%] bg-white">
      <ScrollReveal className="text-center">
        <div className="section-label-line inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3.5">
          What We Offer
        </div>
        <h2 className="font-serif font-black leading-[1.15] text-ink text-[clamp(1.8rem,3vw,2.8rem)] mb-4">
          Every Service,
          <br />
          One Platform
        </h2>
        <p className="text-[1rem] text-ink-soft max-w-[580px] mx-auto leading-[1.7]">
          Find trusted service professionals and rental providers in Kannur through one convenient marketplace.
        </p>
      </ScrollReveal>

      <ScrollReveal
        className="grid mt-12 gap-5"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      >
        {services.map((s) => (
          <button
            key={s.name}
            onClick={() => setActiveService(s)}
            className="service-card bg-beige rounded-[18px] p-7 text-left cursor-pointer transition-all border-[1.5px] border-transparent relative overflow-hidden hover:border-teal hover:-translate-y-1 hover:shadow-[var(--shadow-card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <div className="service-card-overlay" />
            <div className="w-[52px] h-[52px] rounded-[14px] bg-teal-light flex items-center justify-center text-2xl mb-4 relative z-10">
              {s.icon}
            </div>
            <div className="font-bold text-[0.95rem] text-ink mb-1.5 relative z-10">
              {s.name}
            </div>
            <div className="text-[0.8rem] text-ink-soft leading-[1.5] relative z-10">
              {s.desc}
            </div>
          </button>
        ))}
      </ScrollReveal>

      <ServiceModal
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </section>
  );
}
