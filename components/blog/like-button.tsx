"use client";

import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LikeButtonProps {
  postSlug: string;
}

export function LikeButton({ postSlug }: LikeButtonProps) {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetchLikesCount();
  }, [postSlug]);

  const fetchLikesCount = async () => {
    try {
      const response = await fetch(`/api/likes?postSlug=${postSlug}`);
      if (response.ok) {
        const data = await response.json();
        setLikesCount(data.count);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des likes:', error);
    }
  };

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postSlug }),
      });

      if (response.ok) {
        setLikesCount(prev => prev + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error('Erreur lors du like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      disabled={isLiking || hasLiked}
      className="flex items-center gap-2 border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/10"
    >
      {isLiking ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`h-4 w-4 ${hasLiked ? 'fill-orange-500 text-orange-500' : 'text-orange-500'}`} />
      )}
      <span className="text-sm">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
    </Button>
  );
}