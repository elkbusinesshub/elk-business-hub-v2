import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers – ELK Business Hub",
  alternates: { canonical: "/careers" },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
