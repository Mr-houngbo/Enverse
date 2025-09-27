import { getRecentPosts } from '@/lib/posts';
import { getFeaturedProjects } from '@/lib/projects';
import { PostCard } from '@/components/blog/post-card';
import { ProjectCard } from '@/components/projects/project-card';
import { ArrowRight, Coffee, Code, Brain } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const recentPosts = getRecentPosts(3);
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary dark:border-primary-dark">
          <Image
            src="images/profile.JPG"
            alt="Photo de profil"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-foreground-dark">
            Bienvenue sur mon 
            <span className="text-primary dark:text-primary-dark"> blog</span>
          </h1>
          <p className="text-xl text-secondary dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed">
            Explorez mes réflexions sur l'IA, la data science et mes projets. 
            Un espace pour partager des idées et construire ensemble l'avenir technologique.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-center items-center space-x-8 pt-6">
          <div className="flex items-center space-x-2 text-secondary dark:text-secondary-dark">
            <Code className="h-5 w-5" />
            <span className="font-medium">Développeur</span>
          </div>
          <div className="flex items-center space-x-2 text-secondary dark:text-secondary-dark">
            <Brain className="h-5 w-5" />
            <span className="font-medium">IA & Data</span>
          </div>
          <div className="flex items-center space-x-2 text-secondary dark:text-secondary-dark">
            <Coffee className="h-5 w-5" />
            <span className="font-medium">Passionné</span>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground dark:text-foreground-dark">
            Derniers Articles
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark dark:text-primary-dark dark:hover:text-primary transition-colors font-medium"
          >
            <span>Voir tous les articles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, index) => (
              <PostCard 
                key={post.slug} 
                post={post} 
                featured={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary dark:text-secondary-dark text-lg">
              Aucun article pour le moment. Le premier article arrive bientôt !
            </p>
          </div>
        )}
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground dark:text-foreground-dark">
              Projets en Vedette
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark dark:text-primary-dark dark:hover:text-primary transition-colors font-medium"
            >
              <span>Voir tous les projets</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <h2 className="text-2xl font-bold text-foreground dark:text-foreground-dark">
          Envie d'en savoir plus ?
        </h2>
        <p className="text-secondary dark:text-secondary-dark max-w-md mx-auto">
          Découvrez mon parcours, mes projets et mes réflexions sur les technologies émergentes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/about" className="btn-primary">
            À propos de moi
          </Link>
          <Link href="/blog" className="btn-secondary">
            Lire les articles
          </Link>
        </div>
      </section>
    </div>
  );
}