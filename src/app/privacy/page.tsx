import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy – ELK Business Hub",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to ELK Business Hub. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform or use our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our platform.",
  },
  {
    title: "2. Information We Collect",
    content:
      "We collect information that you provide directly to us, such as when you create an account, post an ad, contact us, or use our services. This may include your name, email address, phone number, location, and payment information. We also collect information automatically when you use our platform, such as device information, IP address, and usage data.",
  },
  {
    title: "3. How We Use Your Information",
    content:
      "We use the information we collect to provide, maintain, and improve our services; process transactions; send you technical notices and support messages; respond to your comments and questions; and send you marketing communications (where permitted by law). We may also use your information to monitor and analyse trends and usage, and to detect and prevent fraudulent transactions.",
  },
  {
    title: "4. Sharing of Your Information",
    content:
      "We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing, data analysis, and customer service. We may also share your information if we believe disclosure is in accordance with, or required by, any applicable law or legal process. We do not sell your personal information to third parties.",
  },
  {
    title: "5. Data Storage & Security",
    content:
      "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorised access. Your data is stored on secure servers located in India and may be transferred to and processed in other countries. We retain personal information for as long as necessary to fulfil the purposes for which it was collected.",
  },
  {
    title: "6. Cookies",
    content:
      "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.",
  },
  {
    title: "7. Your Rights",
    content:
      "You have the right to access, update, or delete the personal information we hold about you. You may also have the right to object to or restrict certain processing of your personal information. To exercise these rights, please contact us using the details provided below.",
  },
  {
    title: "8. Children's Privacy",
    content:
      "Our platform is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.",
  },
  {
    title: "9. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date. You are advised to review this Privacy Policy periodically for any changes.",
  },
  {
    title: "10. Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at: ELK Business Hub, support@elkbusinesshub.com",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-[5%] max-w-[860px] mx-auto">
        {/* Header */}
        <div className="mb-12 pt-8">
          {/* <span className="inline-block bg-teal-light text-teal text-[0.75rem] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full mb-4">
            Legal
          </span> */}
          <h1 className="font-serif font-black text-[clamp(2rem,4vw,2.8rem)] text-ink leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-ink-soft text-[0.9rem]">
            Effective date: <strong>1 January 2025</strong>
          </p>
        </div>

        {/* Intro callout */}
        <div className="bg-teal-light border border-teal/20 rounded-[14px] p-6 mb-10 text-[0.95rem] text-ink leading-[1.7]">
          Your privacy matters to us. This policy describes how ELK Business Hub
          collects, uses, and protects your personal information across our
          website and mobile applications.
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-bold text-[1.05rem] text-ink mb-3 pb-2 border-b border-beige-dark">
                {s.title}
              </h2>
              <p className="text-ink-soft leading-[1.8] text-[0.95rem]">
                {s.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-beige-dark text-[0.85rem] text-ink-soft">
          Last updated: 1 January 2025 · ELK Business Hub ·{" "}
          <a href="mailto:support@elkbusinesshub.com" className="text-teal">
            support@elkbusinesshub.com
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
