import { getFeaturedProjects } from '@/lib/projects';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = getFeaturedProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
