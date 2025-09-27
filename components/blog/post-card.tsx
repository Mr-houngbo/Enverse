import Link from 'next/link';
import { ArticleImage } from '@/components/image-with-fallback';
import { Calendar, Clock } from 'lucide-react';
import type { PostMetadata } from '@/lib/posts';

interface PostCardProps {
  post: PostMetadata;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={`card group ${featured ? 'md:col-span-2' : ''}`}>
      {post.image && (
        <div className={`relative overflow-hidden rounded-lg mb-4 ${featured ? 'h-48' : 'h-32'}`}>
          <ArticleImage
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center space-x-4 text-sm text-secondary dark:text-secondary-dark">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <h3 className={`font-bold text-primary dark:text-primary-dark group-hover:text-accent transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-secondary dark:text-secondary-dark leading-relaxed">
          {post.summary}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center space-x-2 text-accent hover:text-accent-dark font-medium transition-colors"
        >
          <span>Lire l'article</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}
