-- Migration pour ajouter likes et commentaires aux posts
-- Créer table likes
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  post_slug TEXT NOT NULL,
  user_identifier TEXT, -- pseudo ou email, optionnel pour anonyme
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer table comments
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_slug TEXT NOT NULL,
  author TEXT DEFAULT 'Anonyme',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_likes_post_slug ON likes(post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_likes_user ON likes(user_identifier);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);
