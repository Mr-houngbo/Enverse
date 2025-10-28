"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Loader2, Send } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Comment {
  id: number;
  post_slug: string;
  author: string;
  content: string;
  created_at: string;
}

interface CommentsSectionProps {
  postSlug: string;
}

export function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postSlug=${postSlug}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postSlug,
          author: author.trim() || 'Anonyme',
          content: content.trim(),
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments(prev => [newComment.comment, ...prev]);
        setContent('');
        setAuthor('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du commentaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Formulaire de commentaire */}
      <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
            <MessageCircle className="h-5 w-5" />
            Laisser un commentaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Votre nom (optionnel)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100"
            />
            <Textarea
              placeholder="Votre commentaire..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              className="bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 resize-none"
            />
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Envoyer
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100">
          Commentaires ({comments.length})
        </h3>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-orange-900 dark:text-orange-100">
                        {comment.author}
                      </span>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(comment.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                      </time>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Aucun commentaire pour le moment. Soyez le premier à commenter !
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
