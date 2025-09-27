"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { PostCard } from '@/components/blog/post-card';
import { ProjectCard } from '@/components/projects/project-card';
import { ArrowRight, Coffee } from 'lucide-react';
import Link from 'next/link';
import { ConsoleIntro } from '@/components/console-intro';
import { InteractivePhoto } from '@/components/interactive-photo';
import { InteractiveCards } from '@/components/interactive-cards';
import { AfricaMap } from '@/components/africa-map';

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image?: string;
  video?: string;
  readingTime: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, projectsRes] = await Promise.all([
          fetch('/api/posts'),
          fetch('/api/projects')
        ]);

        if (postsRes.ok) {
          const posts = await postsRes.json();
          setRecentPosts(posts);
        }

        if (projectsRes.ok) {
          const projects = await projectsRes.json();
          console.log('Projects loaded:', projects.length); // Debug log
          setFeaturedProjects(projects.filter((project: any) => project.featured));
        } else {
          console.error('Failed to fetch projects:', projectsRes.status); // Debug log
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <ConsoleIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black relative">
      {/* Africa Map Background */}
      <AfricaMap />

      {/* Enhanced floating elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-orange-300/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-orange-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 border border-orange-400/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-10 w-8 h-8 bg-orange-500/10 rotate-12 animate-pulse delay-1000"></div>

        {/* Floating particles */}
        <div className="absolute top-16 left-1/3 w-2 h-2 bg-orange-400/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-orange-300/60 rounded-full animate-ping delay-700"></div>
        <div className="absolute top-2/3 left-20 w-1 h-1 bg-orange-500/60 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 right-20 w-2.5 h-2.5 bg-orange-400/40 rounded-full animate-bounce delay-1200"></div>
      </div>

      <div className="relative w-full z-10">
        
        {/* Hero Section */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left side - Text content */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                    <span className="text-orange-300 text-sm font-medium">✨ Bienvenue sur mon univers , Créatif & Technologique </span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 dark:from-white dark:via-orange-100 dark:to-orange-300 leading-tight">
                    Enverse
                  </h1>
                </div>
                
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-light">
                  Explorez mes réflexions et projets autour de l'<span className="text-orange-500 dark:text-orange-300 font-semibold">IA</span> et de la <span className="text-orange-500 dark:text-orange-300 font-semibold">data science</span> jusqu'aux horizons philosophiques.
                  <span className="block mt-4 text-orange-400 dark:text-orange-300/80 font-medium">
                    Un ouvert pour explorer, rêver et tordre l'avenir à notre image.
                  </span>
                </p>

                {/* Interactive Cards CTA */}
                <div className="pt-8">
                  <InteractiveCards />
                </div>
              </div>

              {/* Right side - Interactive Photo - Closer to text */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <InteractivePhoto
                  src="https://drive.google.com/uc?export=view&id=1NDvB_Q63P72CgQOwhgiS5W_ncq7fJYVr"
                  alt="Photo de profil"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/50 dark:via-black/80 dark:to-gray-900/50">
          <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Derniers
                <span className="text-orange-400 ml-3">Articles</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
            </div>
            
            <Link
              href="/blog"
              className="group inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
            >
              <span>Voir tous les articles</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl animate-pulse">
                  <div className="p-6 space-y-4">
                    <div className="w-3/4 h-6 bg-gray-700 rounded"></div>
                    <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-700 rounded"></div>
                      <div className="w-5/6 h-4 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, index) => (
                <div key={post.slug} className="group">
                  <div className="h-full p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10">
                    <PostCard 
                      post={post} 
                      featured={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-4">
                <Coffee className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-gray-400 dark:text-gray-400 text-xl font-light">
                Aucun article pour le moment. Le premier article arrive bientôt !
              </p>
            </div>
          )}
          </div>
        </section>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/50 dark:via-black/80 dark:to-gray-900/50">
            <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  Projets en
                  <span className="text-orange-400 ml-3">Vedette</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
              </div>
              
              <Link
                href="/projects"
                className="group inline-flex items-center space-x-3 px-6 py-3 border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span>Voir tous les projets</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <div key={project.id} className="group">
                  <div className="h-full p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10">
                    <ProjectCard project={project} />
                  </div>
                </div>
              ))}
            </div>
            </div>
          </section>
        )}

      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}