export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  featured?: boolean;
}

// Mock data - À remplacer par vos vrais projets
export const projects: Project[] = [
  {
    id: 'ai-chatbot',
    title: 'Chatbot IA Avancé',
    description: 'Un chatbot intelligent utilisant les dernières technologies d\'IA pour comprendre et répondre aux requêtes complexes.',
    tags: ['IA', 'Python', 'OpenAI', 'FastAPI'],
    image: '/images/ai-chatbot.svg',
    githubUrl: 'https://github.com/Mr-houngbo/ai-chatbot',
    demoUrl: 'https://demo-chatbot.vercel.app',
    featured: true,
  },
  {
    id: 'data-viz-dashboard',
    title: 'Dashboard de Visualisation de Données',
    description: 'Un tableau de bord interactif pour visualiser et analyser des datasets complexes avec des graphiques dynamiques.',
    tags: ['Data Science', 'React', 'D3.js', 'Python'],
    image: '/images/data-dashboard.svg',
    githubUrl: 'https://github.com/Mr-houngbo/data-dashboard',
    demoUrl: 'https://data-dashboard.vercel.app',
    featured: true,
  },
  {
    id: 'ml-prediction-api',
    title: 'API de Prédiction ML',
    description: 'Une API RESTful pour servir des modèles de machine learning en production avec FastAPI et Docker.',
    tags: ['Machine Learning', 'FastAPI', 'Docker', 'MLOps'],
    image: '/images/ml-api.svg',
    githubUrl: 'https://github.com/Mr-houngbo/ml-api',
    featured: false,
  },
];

export function getAllProjects(): Project[] {
  // Maintenant on lit depuis le fichier JSON via l'API
  // Cette fonction est gardée pour compatibilité
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function addProject(newProject: Omit<Project, 'id'> & { id: string }): Project {
  const project: Project = {
    ...newProject,
    tags: newProject.tags || [],
  };

  // Pour l'instant, on ne sauvegarde pas dans l'array local
  // Les projets sont maintenant sauvegardés dans le fichier JSON via l'API
  return project;
}