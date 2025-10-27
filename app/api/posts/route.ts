import { getRecentPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';
import { createPost } from '@/lib/posts';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createPostSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  date: z.string().optional(),
  tags: z.string().optional(),
  summary: z.string().min(1, 'Le résumé est requis'),
  image: z.string().optional(),
  video: z.string().optional(),
  content: z.string().min(1, 'Le contenu est requis'),
});

export async function GET() {
  try {
    const posts = await getRecentPosts(3);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = createPostSchema.parse(body);

    // Create slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Parse tags
    const tags = validatedData.tags
      ? validatedData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    // Create post data
    const postData = {
      title: validatedData.title,
      date: validatedData.date || new Date().toISOString().split('T')[0],
      tags,
      summary: validatedData.summary,
      image: validatedData.image || undefined,
      video: validatedData.video || undefined,
      content: validatedData.content,
    };

    // Create the post
    const result = await createPost(slug, postData);

    return NextResponse.json({ success: result.supabaseSuccess, post: result.post }, { status: result.supabaseSuccess ? 201 : 200 });
  } catch (error) {
    console.error('Error in POST /api/posts:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
