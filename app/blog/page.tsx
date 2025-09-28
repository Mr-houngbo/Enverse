import { getAllPosts, getAllTags } from '@/lib/posts';
import { PostCard } from '@/components/blog/post-card';
import { BlogFilter } from '@/components/blog/blog-filter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Calixte Raoul T. HOUNGBO | Articles IA, Data Science & Réflexions',
  description: 'Découvrez les articles de Calixte Raoul T. HOUNGBO sur l\'intelligence artificielle, la data science, mes projets et réflexions personnelles.',
  authors: [{ name: 'Calixte Raoul T. HOUNGBO' }],
  creator: 'Calixte Raoul T. HOUNGBO',
  openGraph: {
    title: 'Blog - Calixte Raoul T. HOUNGBO | Articles IA & Data Science',
    description: 'Découvrez les articles de Calixte Raoul T. HOUNGBO sur l\'intelligence artificielle, la data science et ses réflexions personnelles.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Calixte Raoul T. HOUNGBO | Articles IA & Data Science',
    description: 'Découvrez les articles de Calixte Raoul T. HOUNGBO sur l\'intelligence artificielle, la data science et ses réflexions personnelles.',
    creator: '@raoulcalixte',
  },
};

interface BlogPageProps {
  searchParams: { tag?: string; page?: string };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const selectedTag = searchParams.tag;
  const currentPage = parseInt(searchParams.page || '1');
  const postsPerPage = 6;

  // Filter posts by tag
  const filteredPosts = selectedTag 
    ? allPosts.filter(post => post.tags.includes(selectedTag))
    : allPosts;

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground dark:text-foreground-dark mb-4">
          Blog
        </h1>
        <p className="text-xl text-secondary dark:text-secondary-dark max-w-2xl mx-auto">
          {selectedTag 
            ? `Articles tagués "${selectedTag}" (${filteredPosts.length})`
            : `Tous mes articles (${allPosts.length})`
          }
        </p>
      </div>

      {/* Filter */}
      <BlogFilter tags={allTags} selectedTag={selectedTag} />

      {/* Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {paginatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary dark:text-secondary-dark text-lg">
            {selectedTag 
              ? `Aucun article trouvé pour le tag "${selectedTag}".`
              : 'Aucun article pour le moment.'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`/blog?${new URLSearchParams({
                ...(selectedTag && { tag: selectedTag }),
                page: page.toString(),
              }).toString()}`}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {page}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}