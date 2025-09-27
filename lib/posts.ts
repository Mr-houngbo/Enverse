import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image?: string;
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
  readingTime: string;
}

// Ensure posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export function getAllPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => {
        const slug = name.replace(/\.mdx$/, '');
        return getPostBySlug(slug);
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

    return allPosts;
  } catch (error) {
    console.warn('No posts directory found or error reading posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
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
      content,
      readingTime: readTime.text,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getPostsByTag(tag: string): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter((post) => post.tags.includes(tag))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      tags: post.tags,
      summary: post.summary,
      image: post.image,
      readingTime: post.readingTime,
    }));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = allPosts.flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

export function getRecentPosts(limit: number = 3): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    image: post.image,
    readingTime: post.readingTime,
  }));
}