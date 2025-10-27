"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '@enverse2025'; // fallback pour dev

export default function AdminAuthPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const MAX_ATTEMPTS = 2;

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (password === ADMIN_PASSWORD) {
      // Authentification réussie - rediriger vers /admin
      sessionStorage.setItem('adminAuthenticated', 'true');
      router.push('/admin');
    } else {
      if (newAttempts >= MAX_ATTEMPTS) {
        setError(`Nombre maximum de tentatives atteint (${MAX_ATTEMPTS}). Redirection vers la page d'accueil.`);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setError(`Mot de passe incorrect. Tentative ${newAttempts}/${MAX_ATTEMPTS}`);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-2">
            Accès Administration
          </h1>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            Cette section nécessite une authentification pour être accessible
          </p>
        </div>

        <div className="bg-white dark:bg-orange-900/20 backdrop-blur-sm border border-orange-200 dark:border-orange-800/50 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                Mot de passe d'administration
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400 transition-all duration-200"
                  placeholder="Entrez le mot de passe"
                  required
                  disabled={isSubmitting || attempts >= MAX_ATTEMPTS}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-orange-600 dark:text-orange-400 mb-4">
                Tentatives restantes: {Math.max(0, MAX_ATTEMPTS - attempts)}/{MAX_ATTEMPTS}
              </p>
            </div>

            {error && (
              <div className={`text-sm text-center p-3 rounded-lg ${
                attempts >= MAX_ATTEMPTS
                  ? 'bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300'
                  : 'bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 text-orange-700 dark:text-orange-300'
              }`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || attempts >= MAX_ATTEMPTS}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Vérification...
                </div>
              ) : attempts >= MAX_ATTEMPTS ? (
                'Accès refusé'
              ) : (
                'Accéder à l\'administration'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
