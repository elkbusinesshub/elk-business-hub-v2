import ELKLogo from "@/components/ui/ELKLogo";

const platformLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#rentals", label: "Rentals" },
  { href: "/#advertise", label: "Advertise" },
  // { href: "/#invest", label: "Invest" },
  { href: "/#app", label: "Download App" },
];

const companyLinks = [
  { href: "/#about", label: "About Us" },
  { href: "/#team", label: "Our Team" },
  { href: "/careers", label: "Careers" },
  // { href: "#", label: "Press" },
  // { href: "#", label: "Blog" },
];

const supportLinks = [
  { href: "#", label: "Help Centre" },
  { href: "#", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  // { href: "mailto:invest@elkbusinesshub.com", label: "Investor Relations" },
];

const socials = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/elkcompany/",                             icon: "in" },
  { label: "Instagram", href: "https://www.instagram.com/elkcompany2024?igsh=a2s4dTVpbmQ0amNm",          icon: "ig" },
  { label: "X",         href: "https://x.com/elkcompanyin?t=pOgye8kJHalI7o-00wpJJA&s=09",               icon: "𝕏"  },
  { label: "Facebook",  href: "#",                                                                       icon: "f"  },
  { label: "YouTube",   href: "https://www.youtube.com/@Elkbusinesshub",                                                                       icon: "▶"  },
  { label: "WhatsApp",  href: "https://wa.me/918848294260",                                              icon: "wa" },
];

export default function Footer() {
  return (
    <footer className="bg-ink pt-[60px] px-[5%] pb-7" style={{ color: "rgba(255,255,255,0.7)" }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <ELKLogo height={32} inverted />
          </div>
          <p className="text-[0.85rem] leading-[1.7] max-w-[260px] mb-5">
            India&apos;s most versatile service marketplace. Rent, hire, advertise,
            and grow — all in one place.
          </p>
          <div className="flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white no-underline text-[0.8rem] font-bold transition-all hover:bg-teal"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {s.icon === "wa" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4C7.6 4 3.99 7.6 3.99 12.05c0 1.46.39 2.85 1.12 4.07L4 20.06l4.06-1.06a8.1 8.1 0 0 0 4 1.02h.01c4.45 0 8.06-3.6 8.06-8.06a7.93 7.93 0 0 0-2.53-5.64zm-5.55 12.4a6.7 6.7 0 0 1-3.42-.94l-.24-.14-2.55.67.68-2.48-.16-.26a6.62 6.62 0 0 1-1.02-3.52c0-3.67 2.99-6.65 6.67-6.65a6.62 6.62 0 0 1 4.71 1.95 6.62 6.62 0 0 1 1.95 4.7c0 3.67-3 6.67-6.62 6.67zm3.65-4.97c-.2-.1-1.17-.58-1.36-.64-.18-.07-.31-.1-.45.1-.13.2-.51.64-.63.77-.12.13-.23.15-.43.05-.2-.1-.86-.32-1.64-1.01-.6-.54-1.01-1.2-1.13-1.4-.12-.2-.01-.31.09-.43.1-.12.2-.27.3-.4.1-.13.13-.22.2-.36.07-.14.03-.27-.02-.37-.05-.1-.43-1.05-.6-1.43-.16-.38-.32-.33-.44-.34-.11-.01-.24-.01-.37-.01-.13 0-.34.05-.51.25-.18.2-.7.68-.7 1.66 0 .98.7 1.93.8 2.06.1.13 1.35 2.07 3.29 2.82 1.93.74 1.93.5 2.28.47.35-.03 1.17-.48 1.34-.95.16-.46.16-.86.11-.95-.05-.08-.18-.13-.38-.23z" />
                  </svg>
                ) : (
                  s.icon
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-white font-bold text-[0.88rem] mb-4 tracking-[0.04em]">
            Platform
          </h3>
          <ul className="list-none flex flex-col gap-2.5">
            {platformLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="no-underline text-[0.82rem] transition-colors hover:text-teal"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-bold text-[0.88rem] mb-4 tracking-[0.04em]">
            Company
          </h3>
          <ul className="list-none flex flex-col gap-2.5">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="no-underline text-[0.82rem] transition-colors hover:text-teal"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-bold text-[0.88rem] mb-4 tracking-[0.04em]">
            Support
          </h3>
          <ul className="list-none flex flex-col gap-2.5">
            {supportLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="no-underline text-[0.82rem] transition-colors hover:text-teal"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="flex justify-between items-center flex-wrap gap-3 pt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-[0.78rem]">© 2025 ELK Business Hub. All rights reserved.</p>
        <p className="text-[0.78rem]">
          <a href="https://elkbusinesshub.com" className="text-teal no-underline">
            elkbusinesshub.com
          </a>
        </p>
      </div>
    </footer>
  );
}
