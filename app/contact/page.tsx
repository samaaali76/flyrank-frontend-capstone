import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'semaaali76@gmail.com',
    href: 'mailto:semaaali76@gmail.com',
  },
  {
    label: 'Phone',
    value: '+20 111 335 7960',
    href: 'tel:+201113357960',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/samaa-ali',
    href: 'https://linkedin.com/in/samaa-ali',
  },
  {
    label: 'GitHub',
    value: 'github.com/samaaali76',
    href: 'https://github.com/samaaali76',
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Get in touch
        </p>
        <h1 className="font-display mt-2 text-4xl text-[var(--foreground)] sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 text-neutral-600">
          Based in Nasr City, Cairo. Open to front-end and AI engineering
          opportunities — feel free to reach out through any of these.
        </p>
      </Reveal>

      <ul className="mt-10 flex flex-col gap-4">
        {CONTACT_LINKS.map((link, index) => {
          const isExternal = link.href.startsWith('http');
          return (
            <Reveal key={link.label} delay={index * 60}>
              <li>
                <Link
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between rounded-xl border border-[var(--border)] bg-white/80 px-5 py-4 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-lg"
                >
                  <span className="font-medium text-neutral-500 transition-colors group-hover:text-[var(--primary)]">
                    {link.label}
                  </span>
                  <span className="font-semibold text-[var(--foreground)]">
                    {link.value}
                  </span>
                </Link>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}