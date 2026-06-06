"use client";

import { useEffect } from "react";

// Mirrors the original HTML: one IntersectionObserver for all .reveal elements.
// Runs once after the page mounts — no per-component lifecycle issues.
export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
