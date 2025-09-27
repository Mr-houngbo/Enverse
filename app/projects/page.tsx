import { ProjectCard } from '@/components/projects/project-card';
import { Metadata } from 'next';
import type { Project } from '@/lib/projects';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Projets | Mes créations et développements',
  description: 'Découvrez mes projets en IA, data science, développement web et autres créations technologiques.',
};

async function getProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to read projects file:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Mes Projets
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Une sélection de mes créations, explorations et contributions dans le domaine de la technologie.
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {projects.length} projet{projects.length > 1 ? 's' : ''} trouvé{projects.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid gap-12 md:grid-cols-2 max-w-6xl mx-auto">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-300 text-xl">
            Les projets arrivent bientôt ! En attendant, vous pouvez consulter mes articles.
          </p>
        </div>
      )}
    </div>
  );
}