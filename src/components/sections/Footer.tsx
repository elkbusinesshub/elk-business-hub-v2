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
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-white font-bold text-[0.88rem] mb-4 tracking-[0.04em]">
            Platform
          </h4>
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
          <h4 className="text-white font-bold text-[0.88rem] mb-4 tracking-[0.04em]">
            Company
          </h4>
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
          <h4 className="text-white font-bold text-[0.88rem] mb-4 tracking-[0.04em]">
            Support
          </h4>
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
