import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/project-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projets | Mes créations et développements',
  description: 'Découvrez mes projets en IA, data science, développement web et autres créations technologiques.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground dark:text-foreground-dark mb-4">
          Mes Projets
        </h1>
        <p className="text-xl text-secondary dark:text-secondary-dark max-w-2xl mx-auto">
          Une sélection de mes créations, explorations et contributions dans le domaine de la technologie.
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary dark:text-secondary-dark text-lg">
            Les projets arrivent bientôt ! En attendant, vous pouvez consulter mes articles.
          </p>
        </div>
      )}
    </div>
  );
}