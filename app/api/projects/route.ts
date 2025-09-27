import { getFeaturedProjects, getAllProjects } from '@/lib/projects';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PROJECTS_FILE = path.join(process.cwd(), 'data', 'projects.json');

// Fonction pour lire les projets depuis le fichier JSON
function readProjectsFromFile() {
  try {
    const fileContents = fs.readFileSync(PROJECTS_FILE, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier projects.json:', error);
    return [];
  }
}

// Fonction pour écrire les projets dans le fichier JSON
function writeProjectsToFile(projects: any[]) {
  try {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Erreur lors de l\'écriture du fichier projects.json:', error);
  }
}

// Fonction temporaire pour vérifier si un projet existe
function getProjectById(id: string, projects: any[]) {
  return projects.find((project: any) => project.id === id);
}

// Fonction pour ajouter un projet
function addProject(projectData: any) {
  const projects = readProjectsFromFile();

  // Vérifier si l'ID existe déjà
  if (getProjectById(projectData.id, projects)) {
    throw new Error('Un projet avec cet ID existe déjà');
  }

  // Ajouter le nouveau projet
  const newProject = {
    id: projectData.id,
    title: projectData.title,
    description: projectData.description,
    tags: projectData.tags,
    image: projectData.image,
    githubUrl: projectData.githubUrl,
    demoUrl: projectData.demoUrl,
    videoUrl: projectData.videoUrl,
    featured: projectData.featured || false,
  };

  projects.push(newProject);
  writeProjectsToFile(projects);

  return newProject;
}

export async function GET() {
  try {
    const projects = readProjectsFromFile(); // Retourne tous les projets, pas seulement featured
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation basique
    if (!body.id || !body.title || !body.description || !body.tags) {
      return NextResponse.json(
        { error: 'Champs requis manquants: id, title, description, tags' },
        { status: 400 }
      );
    }

    // Ajouter le projet (la vérification de doublon est faite dans addProject)
    const newProject = addProject({
      id: body.id,
      title: body.title,
      description: body.description,
      tags: Array.isArray(body.tags) ? body.tags : body.tags.split(',').map((tag: string) => tag.trim()),
      image: body.image,
      githubUrl: body.githubUrl,
      demoUrl: body.demoUrl,
      videoUrl: body.videoUrl,
      featured: body.featured || false,
    });

    return NextResponse.json(
      {
        message: 'Projet ajouté avec succès',
        project: newProject
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur lors de l\'ajout du projet:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
