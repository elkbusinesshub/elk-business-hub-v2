import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});


const SITE_URL = "https://www.elkbusinesshub.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ELK Business Hub – Kerala's Rent, Hire & Business Portal",
  description:
    "Kerala's trusted marketplace to rent vehicles, hire services, and advertise businesses in Kannur and beyond.",
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: "/appicon.png",
    apple: "/appicon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ELK Business Hub",
  url: SITE_URL,
  logo: `${SITE_URL}/appicon.png`,
  description:
    "Kerala's trusted marketplace to rent vehicles, hire services, and advertise businesses in Kannur and beyond.",
  sameAs: [
    "https://www.linkedin.com/company/elkcompany/",
    "https://www.instagram.com/elkcompany2024",
    "https://www.threads.com/@elkcompany2026",
    "https://x.com/elkcompanyin",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className="font-sans bg-beige text-ink overflow-x-hidden leading-relaxed">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Script id="reveal" strategy="afterInteractive">{`
          (function () {
            var obs = new IntersectionObserver(function (entries) {
              entries.forEach(function (e) {
                if (e.isIntersecting) {
                  e.target.classList.add('visible');
                  obs.unobserve(e.target);
                }
              });
            }, { threshold: 0.1 });

            var els = document.querySelectorAll('.reveal');
            var viewportHeight = window.innerHeight;
            var aboveFold = [];
            var belowFold = [];

            els.forEach(function (el) {
              var rect = el.getBoundingClientRect();
              if (rect.top < viewportHeight) {
                aboveFold.push(el);
              } else {
                belowFold.push(el);
              }
            });

            aboveFold.forEach(function (el) {
              el.classList.add('visible', 'no-anim');
            });
            belowFold.forEach(function (el) {
              obs.observe(el);
            });
          })();
        `}</Script>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
