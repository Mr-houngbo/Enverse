import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
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
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-center space-x-4 text-sm text-secondary dark:text-secondary-dark">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {format(new Date(post.date), 'dd MMMM yyyy', { locale: fr })}
            </time>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <h2 className={`font-bold text-foreground dark:text-foreground-dark group-hover:text-primary dark:group-hover:text-primary-dark transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-secondary dark:text-secondary-dark leading-relaxed">
          {post.summary}
        </p>

        <div className="flex flex-wrap gap-2">
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

        <div className="pt-2">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-dark dark:text-primary-dark dark:hover:text-primary font-medium transition-colors"
          >
            Lire l'article →
          </Link>
        </div>
      </div>
    </article>
  );
}