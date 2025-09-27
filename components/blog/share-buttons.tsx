"use client";

import { Twitter, Linkedin, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-secondary dark:text-secondary-dark">
        Partager :
      </span>
      
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg text-secondary hover:text-[#1DA1F2] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        aria-label="Partager sur Twitter"
      >
        <Twitter className="h-5 w-5" />
      </a>
      
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg text-secondary hover:text-[#0077B5] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </a>
      
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Copier le lien"
      >
        <Share2 className="h-5 w-5" />
      </button>
      
      {copied && (
        <span className="text-sm text-green-600 dark:text-green-400">
          Copié !
        </span>
      )}
    </div>
  );
}