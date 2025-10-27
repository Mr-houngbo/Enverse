import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { LikeButton } from '@/components/blog/like-button';
import { ShareButtons } from '@/components/blog/share-buttons';
import { MDXContent } from '@/components/blog/mdx-content';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

interface PostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${post.title} | Calixte Raoul T. HOUNGBO - Enverse`,
    description: post.summary,
    authors: [{ name: 'Calixte Raoul T. HOUNGBO' }],
    creator: 'Calixte Raoul T. HOUNGBO',
    openGraph: {
      title: `${post.title} | Calixte Raoul T. HOUNGBO`,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: ['Calixte Raoul T. HOUNGBO'],
      tags: post.tags,
      ...(post.image && { images: [post.image] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Calixte Raoul T. HOUNGBO`,
      description: post.summary,
      creator: '@raoulcalixte',
      ...(post.image && { images: [post.image] }),
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        href="/blog" 
        className="inline-flex items-center space-x-2 text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour aux articles</span>
      </Link>

      {/* Article Header */}
      <article className="prose prose-lg dark:prose-dark max-w-none">
        {post.image && (
          <div className="relative h-64 md:h-80 overflow-hidden rounded-xl mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground dark:text-foreground-dark mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-secondary dark:text-secondary-dark mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {format(new Date(post.date), 'dd MMMM yyyy', { locale: fr })}
              </time>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {post.summary && (
            <p className="text-xl text-secondary dark:text-secondary-dark leading-relaxed italic border-l-4 border-primary dark:border-primary-dark pl-6 mb-8">
              {post.summary}
            </p>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-dark max-w-none">
          <MDXContent content={post.content} />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <LikeButton postSlug={post.slug} />
            <ShareButtons 
              url={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`}
              title={post.title}
            />
          </div>
        </footer>
      </article>
    </div>
  );
}