"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc: string;
  type: 'article' | 'project';
}

export function ImageWithFallback({ src, fallbackSrc, type, alt, ...props }: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={handleError}
    />
  );
}

// Composants spécialisés pour plus de simplicité
export function ArticleImage(props: Omit<ImageProps, 'src'> & { src: string }) {
  return (
    <ImageWithFallback
      {...props}
      fallbackSrc="/images/article-placeholder.svg"
      type="article"
    />
  );
}

export function ProjectImage(props: Omit<ImageProps, 'src'> & { src: string }) {
  return (
    <ImageWithFallback
      {...props}
      fallbackSrc="/images/project-placeholder.svg"
      type="project"
    />
  );
}
