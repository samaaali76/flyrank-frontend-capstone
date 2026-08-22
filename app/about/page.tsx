import { Reveal } from '@/components/Reveal';

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          About
        </p>
        <h1 className="font-display mt-2 text-4xl text-[var(--foreground)] sm:text-5xl">
          Hi, I&apos;m Samaa.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          I&apos;m a Computer Science student at Egyptian Chinese University
          with hands-on experience across AI, front-end development, mobile
          apps, embedded systems, and robotics. I like building intelligent
          software solutions and picking up new skills through real projects
          and internships rather than just coursework.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
              Education
            </h2>
            <div className="mt-3">
              <p className="font-medium text-[var(--foreground)]">
                Egyptian Chinese University
              </p>
              <p className="text-sm text-neutral-600">
                B.Sc. in Computer Science · Oct 2024 – Present
              </p>
              <p className="text-sm text-neutral-600">
                Expected graduation: May 2028 · GPA 3.36/4.0
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
              Currently
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>AI Intern, Front-End Engineering — FlyRank AI</li>
              <li>Student Support Assistant — Physics Academy</li>
              <li>Front-End Web Development Diploma — Route Academy</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            Technical Skills
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              'JavaScript',
              'TypeScript',
              'React / Next.js',
              'Flutter / Dart',
              'C / C++',
              'Python',
              'Firebase',
              'SQL',
              'Arduino / ESP32',
              'Tailwind CSS',
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--primary)]/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={220}>
        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            Certifications
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li>
              <span className="font-medium text-[var(--foreground)]">
                AI Fluency: Framework & Foundations
              </span>{' '}
              — Anthropic Academy, via FlyRank AI Internship
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                HCCDA AI — Artificial Intelligence
              </span>{' '}
              — Huawei Certified Course
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Mobile App Development Training (90 hrs)
              </span>{' '}
              — National Telecommunication Institute
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}