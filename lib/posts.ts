import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import supabase from './supabaseClient';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image?: string;
  video?: string;
  content: string;
  readingTime: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image?: string;
  video?: string;
  readingTime: string;
}

// Ensure posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.warn('Error fetching from Supabase, falling back to filesystem:', error);
      return getAllPostsFromFS();
    }

    return data || [];
  } catch (error) {
    console.warn('Error fetching from Supabase, falling back to filesystem:', error);
    return getAllPostsFromFS();
  }
}

async function getAllPostsFromFS(): Promise<Post[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = await Promise.all(
      fileNames
        .filter((name) => name.endsWith('.mdx'))
        .map(async (name) => {
          const slug = name.replace(/\.mdx$/, '');
          return await getPostBySlug(slug);
        })
    );
    return allPosts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
  } catch (error) {
    console.warn('No posts directory found or error reading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.warn(`Error fetching post ${slug} from Supabase, falling back to filesystem:`, error);
      return getPostBySlugFromFS(slug);
    }

    // If data is null, the post doesn't exist in Supabase, fallback to filesystem
    if (!data) {
      return getPostBySlugFromFS(slug);
    }

    return data;
  } catch (error) {
    console.warn(`Error fetching post ${slug} from Supabase, falling back to filesystem:`, error);
    return getPostBySlugFromFS(slug);
  }
}

function getPostBySlugFromFS(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const readTime = readingTime(content);

    return {
      slug,
      title: data.title || 'Sans titre',
      date: data.date || new Date().toISOString().split('T')[0],
      tags: data.tags || [],
      summary: data.summary || '',
      image: data.image,
      video: data.video,
      content,
      readingTime: readTime.text,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter((post) => post.tags.includes(tag))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      tags: post.tags,
      summary: post.summary,
      image: post.image,
      video: post.video,
      readingTime: post.readingTime,
    }));
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags)).sort();
}

export async function getRecentPosts(limit: number = 3): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    image: post.image,
    video: post.video,
    readingTime: post.readingTime,
  }));
}

export async function createPost(slug: string, postData: Omit<Post, 'slug' | 'readingTime'>): Promise<{ post: Post; supabaseSuccess: boolean }> {
  try {
    const readTime = readingTime(postData.content);
    const newPost: Post = {
      slug,
      ...postData,
      readingTime: readTime.text,
    };

    // Try to insert into Supabase
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert(newPost)
        .select()
        .single();

      if (error) {
        console.warn('Error inserting into Supabase, falling back to filesystem:', error);
        const fsPost = await createPostInFS(slug, postData);
        return { post: fsPost, supabaseSuccess: false };
      }

      return { post: data, supabaseSuccess: true };
    } catch (error) {
      console.warn('Error creating post in Supabase, falling back to filesystem:', error);
      const fsPost = await createPostInFS(slug, postData);
      return { post: fsPost, supabaseSuccess: false };
    }
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

async function createPostInFS(slug: string, postData: Omit<Post, 'slug' | 'readingTime'>): Promise<Post> {
  const readTime = readingTime(postData.content);
  const newPost: Post = {
    slug,
    ...postData,
    readingTime: readTime.text,
  };

  // Save to filesystem
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  // Check if post already exists
  if (fs.existsSync(fullPath)) {
    throw new Error('Un article avec ce titre existe déjà');
  }

  // Create frontmatter
  const frontmatter = {
    title: postData.title,
    date: postData.date,
    tags: postData.tags,
    summary: postData.summary,
    ...(postData.image && { image: postData.image }),
    ...(postData.video && { video: postData.video }),
  };

  // Create content with frontmatter
  const fileContent = matter.stringify(postData.content, frontmatter);

  // Write file
  fs.writeFileSync(fullPath, fileContent, 'utf8');

  return newPost;
}