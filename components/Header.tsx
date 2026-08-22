'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/chat', label: 'Chat' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                  <Link
          href="/"
          className="text-2xl italic text-[#0a1440]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Samaa Ali
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#0a1440]/70 transition-colors hover:text-[#0a1440]"
                          >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-neutral-800" />
            <span className="h-0.5 w-5 bg-neutral-800" />
            <span className="h-0.5 w-5 bg-neutral-800" />
          </div>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 bg-white px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#0a1440]/70 hover:bg-neutral-100 hover:text-[#0a1440]"              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
