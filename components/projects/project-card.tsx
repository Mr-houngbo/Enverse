import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card group">
      {project.image && (
        <div className="relative h-48 overflow-hidden rounded-lg mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground dark:text-foreground-dark group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
          {project.title}
        </h3>

        <p className="text-secondary dark:text-secondary-dark leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-4 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Démo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}