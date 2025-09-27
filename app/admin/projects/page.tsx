"use client";

import { useState } from 'react';
import { AdminProjectForm } from '@/components/admin/admin-project-form';
import { AdminNavbar } from '@/components/admin/admin-navbar';

const ADMIN_PASSWORD = '@enverse2025'; // You should change this to a secure password

export default function AdminProjectsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-2">
              Accès Administration Projets
            </h1>
            <p className="text-orange-700 dark:text-orange-300">
              Entrez le mot de passe pour accéder à la page de publication des projets
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400"
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Accéder
            </button>
          </form>
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
              Publier un nouveau projet
            </h1>
            <p className="text-orange-700 dark:text-orange-300">
              Ajoutez vos projets avec des descriptions détaillées, des images et des liens
            </p>
          </div>

          <AdminProjectForm />
        </div>
      </div>
    </div>
  );
}
