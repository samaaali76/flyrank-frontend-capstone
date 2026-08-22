import type { Project } from '@/lib/projects-data';

export function PortfolioProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)]/40 hover:shadow-xl">
           <h3 className="text-lg font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
        {project.name}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-[var(--muted)]/40 px-3 py-1 text-xs font-medium text-[var(--foreground)] transition-colors group-hover:bg-[var(--primary)]/10"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 border-t border-[var(--border)] pt-4">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--foreground)]"
          >
            View project ↗
          </a>
        ) : (
          <span className="text-sm italic text-neutral-400">
            {project.note ?? 'No public repo'}
          </span>
        )}
      </div>
    </article>
  );
}