"use client";

import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LikeButtonProps {
  postSlug: string;
}

export function LikeButton({ postSlug }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Charger les likes depuis localStorage
    const savedLikes = localStorage.getItem(`likes-${postSlug}`);
    const savedHasLiked = localStorage.getItem(`hasLiked-${postSlug}`);
    
    if (savedLikes) {
      setLikes(parseInt(savedLikes));
    }
    
    if (savedHasLiked) {
      setHasLiked(JSON.parse(savedHasLiked));
    }
  }, [postSlug]);

  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simuler un délai d'API
    setTimeout(() => {
      const newLikes = hasLiked ? likes - 1 : likes + 1;
      const newHasLiked = !hasLiked;
      
      setLikes(newLikes);
      setHasLiked(newHasLiked);
      
      // Sauvegarder dans localStorage
      localStorage.setItem(`likes-${postSlug}`, newLikes.toString());
      localStorage.setItem(`hasLiked-${postSlug}`, JSON.stringify(newHasLiked));
      
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleLike}
        disabled={isLoading}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          hasLiked
            ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
            : 'bg-gray-100 text-secondary hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-secondary-dark dark:hover:bg-red-900/20 dark:hover:text-red-400'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
        aria-label={hasLiked ? 'Ne plus aimer' : 'Aimer cet article'}
      >
        <Heart 
          className={`h-5 w-5 ${hasLiked ? 'fill-current' : ''} ${isLoading ? 'animate-pulse' : ''}`} 
        />
        <span>{likes}</span>
        <span className="hidden sm:inline">
          {hasLiked ? 'Aimé' : 'Aimer'}
        </span>
      </button>
    </div>
  );
}