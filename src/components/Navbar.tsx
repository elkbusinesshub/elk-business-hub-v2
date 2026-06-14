"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ELKLogo from "@/components/ui/ELKLogo";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#rentals", label: "Rentals" },
  { href: "/#advertise", label: "Advertise" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-[1000] bg-beige/95 backdrop-blur-[16px] border-b border-beige-dark transition-all duration-300 ${
        scrolled ? "shadow-[var(--shadow-soft)]" : ""
      }`}
    >
      {/* Top bar */}
      <div
        className={`flex items-center justify-between px-[5%] transition-all duration-300 ${
          scrolled ? "py-[10px]" : "py-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 no-underline" aria-label="ELK Business Hub – Home">
          <ELKLogo height={36} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link font-normal no-underline">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#app"
              className="bg-teal text-white! px-6 py-2.5 rounded-full font-bold! text-[0.9rem] no-underline transition-all hover:bg-teal-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(27,191,191,0.3)]"
            >
              Download App
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1 bg-transparent border-none"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-ink rounded-sm transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink rounded-sm transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink rounded-sm transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] border-t border-beige-dark" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-[5%] py-4 gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="text-ink text-[1.05rem] font-semibold no-underline py-3 border-b border-beige-dark last:border-0 hover:text-teal transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#app"
            onClick={close}
            className="mt-3 bg-teal text-white text-center px-8 py-3 rounded-full text-[0.95rem] font-bold no-underline"
          >
            Download App
          </a>
        </div>
      </div>
    </nav>
  );
}
