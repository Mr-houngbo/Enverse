"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, Eye, EyeOff } from 'lucide-react';

const postSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  date: z.string().optional(),
  tags: z.string().optional(),
  summary: z.string().min(1, 'Le résumé est requis'),
  image: z.string().optional(),
  video: z.string().optional(),
  content: z.string().min(1, 'Le contenu est requis'),
});

type PostFormData = z.infer<typeof postSchema>;

interface AdminPostFormProps {
  onSuccess?: () => void;
}

export function AdminPostForm({ onSuccess }: AdminPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const watchedContent = watch('content');

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Article publié avec succès !',
        });
        reset();
        onSuccess?.();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Erreur lors de la publication',
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

  const renderMarkdownPreview = (content: string) => {
    // Simple markdown preview - in a real app you'd use a proper markdown renderer
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent = '';
    let codeBlockLanguage = '';

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code className={`language-${codeBlockLanguage}`}>{codeBlockContent.trim()}</code>
            </pre>
          );
          inCodeBlock = false;
          codeBlockContent = '';
          codeBlockLanguage = '';
        } else {
          inCodeBlock = true;
          codeBlockLanguage = line.substring(3);
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n';
        return;
      }

      // Handle headers
      if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-3xl font-bold mb-4 mt-6 first:mt-0">{line.substring(2)}</h1>);
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-2xl font-bold mb-3 mt-5">{line.substring(3)}</h2>);
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-xl font-bold mb-2 mt-4">{line.substring(4)}</h3>);
        return;
      }

      // Handle lists
      if (line.startsWith('- ')) {
        elements.push(<li key={index} className="ml-4 mb-1">{processInlineMarkdown(line.substring(2))}</li>);
        return;
      }

      // Handle blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-orange-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
            {processInlineMarkdown(line.substring(2))}
          </blockquote>
        );
        return;
      }

      // Handle empty lines
      if (line.trim() === '') {
        elements.push(<br key={index} />);
        return;
      }

      // Handle video embeds
      const videoRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]{11}|[0-9]+))/g;
      if (videoRegex.test(line)) {
        const match = line.match(videoRegex);
        if (match) {
          const url = match[0];
          let embedUrl = '';
          if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtu.be') ? url.split('/').pop() : url.split('v=')[1]?.split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          } else if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop();
            embedUrl = `https://player.vimeo.com/video/${videoId}`;
          }

          if (embedUrl) {
            elements.push(
              <div key={index} className="my-4">
                <iframe
                  src={embedUrl}
                  className="w-full h-64 rounded-lg"
                  allowFullScreen
                  title="Video embed"
                />
              </div>
            );
            return;
          }
        }
      }

      // Handle regular paragraphs with inline markdown
      elements.push(
        <p key={index} className="mb-3 leading-relaxed">
          {processInlineMarkdown(line)}
        </p>
      );
    });

    return elements;
  };

  const processInlineMarkdown = (text: string) => {
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>');

    // Handle bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>');

    // Handle italic
    text = text.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

    // Handle links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-orange-500 hover:text-orange-600 underline">$1</a>');

    // Handle images
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-2" />');

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <Card className="w-full bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
      <CardHeader className="bg-orange-100 dark:bg-orange-900">
        <CardTitle className="flex items-center justify-between text-orange-900 dark:text-orange-100">
          <span>Nouvel Article</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800"
          >
            {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {previewMode ? 'Éditer' : 'Aperçu'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-orange-50 dark:bg-orange-950">
        {submitStatus.type && (
          <Alert className={`mb-6 ${submitStatus.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' : 'border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'}`}>
            <AlertDescription>
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-orange-800 dark:text-orange-200">Titre *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Titre de l'article"
                className={`bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400 focus:ring-orange-500 focus:border-orange-500 ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-orange-800 dark:text-orange-200">Date</Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
                className="bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-orange-800 dark:text-orange-200">Tags (séparés par des virgules)</Label>
            <Input
              id="tags"
              {...register('tags')}
              placeholder="IA, Machine Learning, Data Science"
              className="bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-orange-800 dark:text-orange-200">Résumé *</Label>
            <Textarea
              id="summary"
              {...register('summary')}
              placeholder="Un bref résumé de l'article..."
              rows={3}
              className={`bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400 focus:ring-orange-500 focus:border-orange-500 resize-none ${errors.summary ? 'border-red-500' : ''}`}
            />
            {errors.summary && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.summary.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-orange-800 dark:text-orange-200">URL de l'image (optionnel)</Label>
            <Input
              id="image"
              {...register('image')}
              placeholder="https://example.com/image.jpg"
              className="bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video" className="text-orange-800 dark:text-orange-200">URL de la vidéo (optionnel)</Label>
            <Input
              id="video"
              {...register('video')}
              placeholder="https://youtube.com/watch?v=... ou https://vimeo.com/..."
              className="bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-orange-800 dark:text-orange-200">Contenu (Markdown) *</Label>
            {previewMode ? (
              <div className="min-h-[400px] p-4 border border-orange-300 dark:border-orange-600 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100">
                {watchedContent ? <div className="prose prose-orange dark:prose-invert max-w-none">{renderMarkdownPreview(watchedContent)}</div> : (
                  <p className="text-orange-600 dark:text-orange-400 italic">Aucun contenu à prévisualiser</p>
                )}
              </div>
            ) : (
              <Textarea
                id="content"
                name="content"
                onChange={(e) => register('content').onChange(e)}
                onBlur={register('content').onBlur}
                ref={register('content').ref}
                placeholder="# Titre principal

## Sous-titre

Votre contenu en Markdown ici...

- Liste item 1
- Liste item 2

[Texte du lien](url-du-lien)

> Citation inspirante

```javascript
// Code exemple
console.log('Hello World!');
```

**Texte en gras** et *texte en italique*

https://youtube.com/watch?v=VIDEO_ID
https://vimeo.com/VIDEO_ID"
                rows={20}
                className={`font-mono text-sm bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 placeholder-orange-600 dark:placeholder-orange-400 focus:ring-orange-500 focus:border-orange-500 resize-vertical ${errors.content ? 'border-red-500' : ''}`}
              />
            )}
            {errors.content && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
            )}
            <p className="text-sm text-orange-700 dark:text-orange-300">
              Utilisez la syntaxe Markdown pour formater votre texte. Support des images, vidéos (via liens), code, listes, etc.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSubmitting ? 'Publication...' : 'Publier l\'article'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
