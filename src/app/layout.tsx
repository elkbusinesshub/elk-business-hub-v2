import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ELK Business Hub – Your Growth Partner",
  description:
    "India's most versatile service marketplace. Rent, hire, advertise, and grow — all in one place.",
  icons: {
    icon: "/appicon.png",
    apple: "/appicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className="font-sans bg-beige text-ink overflow-x-hidden leading-relaxed">
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

            document.querySelectorAll('.reveal').forEach(function (el) {
              var rect = el.getBoundingClientRect();
              if (rect.top < window.innerHeight) {
                // Already visible on load — show instantly, skip animation
                el.classList.add('visible', 'no-anim');
              } else {
                // Below fold — watch for scroll entry
                obs.observe(el);
              }
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
