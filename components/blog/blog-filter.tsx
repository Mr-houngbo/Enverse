"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BlogFilterProps {
  tags: string[];
  selectedTag?: string;
}

export function BlogFilter({ tags, selectedTag }: BlogFilterProps) {
  const searchParams = useSearchParams();
  
  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-2 justify-center">
        <Link
          href="/blog"
          className={`tag ${!selectedTag ? 'bg-primary text-white dark:bg-primary-dark' : ''}`}
        >
          Tous
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className={`tag ${selectedTag === tag ? 'bg-primary text-white dark:bg-primary-dark' : ''}`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}