import ELKLogo from "@/components/ui/ELKLogo";
import ScrollReveal from "@/components/ui/ScrollReveal";

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 814 1000"
      className={className}
      fill="currentColor"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 191.6-49 30.8 0 108.2 2.6 168.6 75.3zm-136-161.3c32.1-38.2 55.5-91.1 55.5-144 0-7.4-.6-15.1-1.9-21.2-52.6 1.9-115.2 35.2-153.4 79.4-29.5 33.8-57.8 86.7-57.8 140.3 0 8.1 1.3 16.2 1.9 18.8 3.2.6 8.4 1.3 13.6 1.3 47.1 0 106.8-31.5 142.1-74.6z" />
    </svg>
  );
}

// Google Play logo using official brand colors
function GooglePlayIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 18 10 L 270 256 L 18 502 C 10 497 4 488 4 478 L 4 34 C 4 24 10 15 18 10 Z"
        fill="#00D2FF"
      />
      <path
        d="M 350 176 L 52 10 L 270 256 L 350 176 Z"
        fill="#FF3A44"
      />
      <path
        d="M 350 336 L 270 256 L 52 502 L 350 336 Z"
        fill="#00F076"
      />
      <path
        d="M 432 216 L 350 176 L 270 256 L 350 336 L 432 296 C 456 283 456 229 432 216 Z"
        fill="#FFD900"
      />
    </svg>
  );
}

export default function AppDownload() {
  return (
    <section
      id="app"
      className="py-[100px] px-[5%] text-center relative overflow-hidden text-white"
      style={{ background: "linear-gradient(135deg, #1BBFBF 0%, #0fa0a0 100%)" }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: -100,
          right: -100,
          background: "radial-gradient(circle, white 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          bottom: -50,
          left: "30%",
          background: "radial-gradient(circle, white 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.1,
        }}
      />

      <ScrollReveal className="relative z-10">
        <div className="flex justify-center mb-6">
          <ELKLogo height={50} inverted />
        </div>
        <h2 className="font-serif font-black text-[clamp(2rem,4vw,3.2rem)] mb-4">
          Launch Your Business Today
        </h2>
        <p className="text-[1rem] opacity-85 max-w-[500px] mx-auto mb-9 leading-[1.7]">
          Download the ELK app and join thousands of businesses already growing
          their income on India&apos;s most versatile marketplace.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {/* App Store */}
          <a
            href="https://apps.apple.com/in/app/elk-business-hub/id6747287788"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 no-underline text-white rounded-[10px] px-6 py-3 transition-all hover:bg-white"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
            }}
          >
            <AppleLogo className="w-7 h-7 text-white group-hover:text-ink transition-colors flex-shrink-0" />
            <div className="text-left">
              <span className="block text-[0.65rem] uppercase tracking-[0.06em] opacity-70 group-hover:text-ink group-hover:opacity-60 transition-colors">
                Download on the
              </span>
              <strong className="text-base font-bold group-hover:text-ink transition-colors">
                App Store
              </strong>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="https://play.google.com/store/apps/details?id=com.elkbusinesshub.elk"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 no-underline text-white rounded-[10px] px-6 py-3 transition-all hover:bg-white"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
            }}
          >
            <GooglePlayIcon size={28} />
            <div className="text-left">
              <span className="block text-[0.65rem] uppercase tracking-[0.06em] opacity-70 group-hover:text-ink group-hover:opacity-60 transition-colors">
                Get it on
              </span>
              <strong className="text-base font-bold group-hover:text-ink transition-colors">
                Google Play
              </strong>
            </div>
          </a>
        </div>

        <p className="mt-6 text-[0.85rem] opacity-60">elkbusinesshub.com</p>
      </ScrollReveal>
    </section>
  );
}
