import Link from 'next/link';
import { ProjectImage } from '@/components/image-with-fallback';
import { Github, ExternalLink, PlayCircle } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10">
      {project.image && (
        <div className="relative h-64 overflow-hidden rounded-xl mb-6 shadow-lg">
          <ProjectImage
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="space-y-5">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span key={tag} className="px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 font-medium text-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-6 pt-4 border-t border-gray-100 dark:border-gray-700/50">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300 transition-colors duration-300 font-medium"
            >
              <Github className="h-5 w-5" />
              <span>Code source</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300 transition-colors duration-300 font-medium"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Voir le projet</span>
            </a>
          )}
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300 transition-colors duration-300 font-medium"
            >
              <PlayCircle className="h-5 w-5" />
              <span>Démo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}