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
      video: data.video,
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
      video: post.video,
      readingTime: post.readingTime,
    }));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags)).sort();
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
    video: post.video,
    readingTime: post.readingTime,
  }));
}

export function createPost(slug: string, postData: Omit<Post, 'slug' | 'readingTime'>): Post {
  try {
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

    // Calculate reading time
    const readTime = readingTime(postData.content);

    return {
      slug,
      ...postData,
      readingTime: readTime.text,
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}