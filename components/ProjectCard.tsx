import type { Project } from '@/lib/projects-data';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <h4 className="project-card__name">{project.name}</h4>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__stack">
        {project.stack.map((tech) => (
          <span key={tech} className="project-card__chip">
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link"
        >
          View project ↗
         </a>
      )}
    </div>
  );
}