"use client";

import { useState } from 'react';

interface AdminProjectFormProps {
  onSuccess?: () => void;
}

export function AdminProjectForm({ onSuccess }: AdminProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    tags: '',
    image: '',
    githubUrl: '',
    demoUrl: '',
    videoUrl: '',
    featured: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Validation basique
    if (!formData.id || !formData.title || !formData.description || !formData.tags) {
      setSubmitStatus({
        type: 'error',
        message: 'Veuillez remplir tous les champs requis (ID, titre, description, tags)',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Projet ajouté avec succès !',
        });
        setFormData({
          id: '',
          title: '',
          description: '',
          tags: '',
          image: '',
          githubUrl: '',
          demoUrl: '',
          videoUrl: '',
          featured: false,
        });
        onSuccess?.();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Erreur lors de l\'ajout du projet',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Erreur de réseau. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-2">
          Nouveau Projet
        </h2>
      </div>

      {submitStatus.type && (
        <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="id" className="block text-sm font-medium text-orange-800 dark:text-orange-200">
              ID du projet *
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="mon-super-projet"
              className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400"
              required
            />
            <p className="text-xs text-orange-700 dark:text-orange-300">
              Identifiant unique (lettres minuscules, chiffres, tirets uniquement)
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-orange-800 dark:text-orange-200">
              Titre du projet *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Mon Super Projet"
              className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-orange-800 dark:text-orange-200">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Décrivez votre projet en détail..."
            rows={4}
            className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400 resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-orange-800 dark:text-orange-200">
            Tags (séparés par des virgules) *
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="React, TypeScript, IA, Machine Learning"
            className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-orange-800 dark:text-orange-200">
              URL de l'image (optionnel)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/project-image.jpg"
              className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400"
            />
            <p className="text-xs text-orange-700 dark:text-orange-300">
              Image représentative du projet
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="githubUrl" className="block text-sm font-medium text-orange-800 dark:text-orange-200">
              URL GitHub (optionnel)
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleInputChange}
              placeholder="https://github.com/username/project"
              className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="demoUrl" className="block text-sm font-medium text-orange-800 dark:text-orange-200">
              URL de démonstration (optionnel)
            </label>
            <input
              type="url"
              id="demoUrl"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleInputChange}
              placeholder="https://project-demo.vercel.app"
              className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="videoUrl" className="block text-sm font-medium text-orange-800 dark:text-orange-200">
              URL de la vidéo (optionnel)
            </label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="https://youtube.com/watch?v=... ou https://vimeo.com/..."
              className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-orange-800 dark:text-orange-200">
            Options
          </label>
          <div className="flex items-center space-x-3 p-4 bg-orange-100 dark:bg-orange-900 rounded-lg border border-orange-300 dark:border-orange-600">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-orange-300 rounded"
            />
            <label htmlFor="featured" className="text-orange-900 dark:text-orange-100 cursor-pointer">
              Mettre en avant ce projet
            </label>
          </div>
          <p className="text-xs text-orange-700 dark:text-orange-300">
            Les projets mis en avant apparaissent dans la section "Projets en vedette" de la page d'accueil
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Ajouter le projet'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
