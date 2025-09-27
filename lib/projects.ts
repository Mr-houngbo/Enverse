export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

// Mock data - À remplacer par vos vrais projets
export const projects: Project[] = [
  {
    id: 'ai-chatbot',
    title: 'Chatbot IA Avancé',
    description: 'Un chatbot intelligent utilisant les dernières technologies d\'IA pour comprendre et répondre aux requêtes complexes.',
    tags: ['IA', 'Python', 'OpenAI', 'FastAPI'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/Mr-houngbo/ai-chatbot',
    demoUrl: 'https://demo-chatbot.vercel.app',
    featured: true,
  },
  {
    id: 'data-viz-dashboard',
    title: 'Dashboard de Visualisation de Données',
    description: 'Un tableau de bord interactif pour visualiser et analyser des datasets complexes avec des graphiques dynamiques.',
    tags: ['Data Science', 'React', 'D3.js', 'Python'],
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/Mr-houngbo/data-dashboard',
    demoUrl: 'https://data-dashboard.vercel.app',
    featured: true,
  },
  {
    id: 'ml-prediction-api',
    title: 'API de Prédiction ML',
    description: 'Une API RESTful pour servir des modèles de machine learning en production avec FastAPI et Docker.',
    tags: ['Machine Learning', 'FastAPI', 'Docker', 'MLOps'],
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/Mr-houngbo/ml-api',
    featured: false,
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}