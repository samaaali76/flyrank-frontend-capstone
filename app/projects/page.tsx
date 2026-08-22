import { PROJECTS } from '@/lib/projects-data';
import { PortfolioProjectCard } from '@/components/PortfolioProjectCard';
import { Reveal } from '@/components/Reveal';

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Selected Work
        </p>
        <h1 className="font-display mt-2 text-4xl text-[var(--foreground)] sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-600">
          A mix of web, mobile, and embedded projects — from AI-assisted apps
          to a Connect 4-playing robot. Some link out to their GitHub repos;
          the hardware builds and a couple of unpublished ones are noted below
          their descriptions instead.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <PortfolioProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}