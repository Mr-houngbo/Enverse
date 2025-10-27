"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPostForm } from '@/components/admin/admin-post-form';
import { AdminNavbar } from '@/components/admin/admin-navbar';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification au montage du composant
    const authenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (!authenticated) {
      router.replace('/admin/auth');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    router.push('/');
  };

  // Afficher un écran de chargement pendant la vérification
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-orange-700 dark:text-orange-300">Vérification de l'accès...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-black">
      <AdminNavbar onLogout={handleLogout} />

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-orange-900 dark:text-orange-100 mb-2">
              Publier un nouvel article
            </h1>
            <p className="text-orange-700 dark:text-orange-300">
              Créez et publiez vos articles avec du texte enrichi, des images et des vidéos
            </p>
          </div>

          <AdminPostForm />
        </div>
      </div>
    </div>
  );
}
