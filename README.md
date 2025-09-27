# 📝 Blog Personnel - Next.js + MDX

Un blog personnel moderne et minimaliste construit avec Next.js, Tailwind CSS et MDX. Parfait pour partager vos articles sur l'IA, la data science, et vos réflexions personnelles.

## ✨ Fonctionnalités

### 🎨 Design & UX
- **Design minimaliste** avec palette de couleurs orange/noir/blanc
- **Mode sombre** fonctionnel avec toggle
- **Design responsive** (mobile-first)
- **Animations subtiles** et micro-interactions
- **Typography optimisée** avec Inter font

### 📚 Gestion de contenu
- **Articles en MDX** avec frontmatter YAML
- **Système de tags** et filtrage
- **Dates de publication** et tri chronologique
- **Temps de lecture** estimé automatiquement
- **Images optimisées** avec Next.js Image

### 🚀 Fonctionnalités avancées
- **SEO optimisé** (métadonnées, Open Graph, Twitter Cards)
- **Sitemap XML** généré automatiquement
- **Flux RSS** pour les abonnés
- **Boutons de partage** social (Twitter, LinkedIn)
- **Système de likes** (localStorage)
- **Navigation intelligente** avec état actif

### 🔧 Technique
- **Next.js 13+** avec App Router
- **TypeScript** pour la robustesse
- **Tailwind CSS** pour le styling
- **Génération statique** (SSG) pour les performances
- **Architecture modulaire** et extensible

## 🚀 Installation rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

1. **Cloner et installer**
```bash
git clone <votre-repo>
cd enverse
npm install
```

2. **Configurer l'environnement**
```bash
cp .env.local.example .env.local
# Éditer .env.local avec vos informations
```

3. **Lancer en développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📝 Ajouter un article

### 1. Créer un fichier MDX

Créez un fichier dans `/posts/mon-article.mdx` :

```mdx
---
title: "Titre de mon article"
date: "2025-01-27"
tags: ["IA", "Data Science", "Python"]
summary: "Résumé accrocheur de l'article en 1-2 phrases."
image: "https://images.pexels.com/photos/xxxxx/photo.jpg"
---

# Mon super article

Contenu de l'article en **Markdown** !

## Section importante

Vous pouvez utiliser :
- Listes
- **Gras** et *italique*
- `Code inline`
- [Liens](https://example.com)

```python
# Blocs de code avec coloration syntaxique
def hello_world():
    print("Hello, World!")
```

> Citations importantes

### Images
![Description](https://example.com/image.jpg)

Et bien plus encore !
```

### 2. L'article apparaît automatiquement

- Sur la page d'accueil (si récent)
- Dans la liste des articles
- Avec son URL `/blog/mon-article`
- Dans le sitemap et RSS

## 🎨 Personnalisation

### Couleurs
Modifiez `tailwind.config.ts` :

```typescript
colors: {
  primary: {
    DEFAULT: '#FF6600',    // Orange principal
    dark: '#FF7700',       // Orange mode sombre
  },
  // ...
}
```

### Informations personnelles
Éditez `.env.local` et les fichiers suivants :
- `app/about/page.tsx` - Page à propos
- `components/layout/header.tsx` - Nom/logo
- `components/layout/footer.tsx` - Copyright et liens sociaux

### Ajouter un tag
Les tags sont automatiquement détectés depuis vos articles. Utilisez simplement :
```yaml
tags: ["Nouveau Tag", "IA", "Python"]
```

## 🌍 Déploiement sur Vercel

### 1. Méthode automatique
1. Poussez votre code sur GitHub
2. Connectez votre repo à Vercel
3. Déploiement automatique !

### 2. Via CLI Vercel
```bash
npm install -g vercel
vercel
```

### 3. Configuration de production

Ajoutez vos variables d'environnement dans Vercel :
```
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_SITE_NAME=Mon Blog
# ... autres variables
```

## 📁 Structure du projet

enverse/
├── 📁 app/                    # App Router (Next.js 13+)
│   ├── 📄 page.tsx           # Page d'accueil
│   ├── 📁 blog/              # Articles
│   │   ├── 📄 page.tsx       # Liste des articles
│   │   └── 📁 [slug]/        # Article individuel
│   ├── 📁 projects/          # Projets
│   ├── 📁 about/             # À propos
│   ├── 📁 sitemap.xml/       # Sitemap généré
│   ├── 📁 rss.xml/           # Flux RSS
│   ├── 📄 layout.tsx         # Layout principal
│   └── 📄 globals.css        # Styles globaux
├── 📁 components/             # Composants React
│   ├── 📁 blog/              # Composants blog
│   ├── 📁 layout/            # Header, Footer
│   ├── 📁 projects/          # Composants projets
│   └── 📁 ui/                # Composants UI (shadcn)
├── 📁 lib/                   # Utilitaires
│   ├── 📄 posts.ts          # Gestion des articles
│   └── 📄 projects.ts       # Gestion des projets
├── 📁 posts/                 # Articles en MDX
│   ├── 📄 premier-article.mdx
│   ├── 📄 ia-et-avenir.mdx
│   └── 📄 ...
├── 📁 public/               # Assets statiques
├── 📄 tailwind.config.ts    # Configuration Tailwind
├── 📄 next.config.js        # Configuration Next.js
└── 📄 package.json          # Dépendances
```

## 🔧 Extensions possibles

### Commentaires avec Giscus
1. Activez Discussions sur votre repo GitHub
2. Installez giscus : https://giscus.app/
3. Ajoutez le composant dans `app/blog/[slug]/page.tsx`

### Analytics
Ajoutez Google Analytics dans `app/layout.tsx` :
```typescript
// Google Analytics 4
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### Newsletter
Intégrez Mailchimp, ConvertKit ou Buttondown pour les abonnements.

### Base de données (future)
Migrez vers Supabase pour :
- Likes synchronisés
- Commentaires natives
- Statistiques avancées
- Authentification utilisateurs

## 🐛 Dépannage

### Problèmes courants

**❌ Les articles n'apparaissent pas**
- Vérifiez le frontmatter YAML
- Format de date : "YYYY-MM-DD"
- Fichier dans `/posts/` avec extension `.mdx`

**❌ Erreur de build**
```bash
npm run build  # Tester localement
npm run typecheck  # Vérifier TypeScript
```

**❌ Images ne s'affichent pas**
- Utilisez des URLs absolues Pexels/Unsplash
- Ou placez dans `/public/` et référencez : `/image.jpg`

### Support
Créez une issue sur le repo GitHub pour toute question !

## 📄 Licence

MIT License - Utilisez ce code librement pour vos projets personnels.

---

## 🎯 Roadmap

### Version actuelle (v1.0)
- ✅ Blog fonctionnel avec MDX
- ✅ Design responsive et mode sombre
- ✅ SEO, sitemap, RSS
- ✅ Système de likes local
- ✅ Partage social

### À venir (v1.1)
- 🔄 Intégration Giscus (commentaires)
- 🔄 Recherche full-text
- 🔄 Recommandations d'articles
- 🔄 Newsletter intégrée

### Plus tard (v2.0)
- 🔮 Multilingue (i18n)
- 🔮 API routes pour likes/stats
- 🔮 Dashboard admin
- 🔮 Version mobile app (PWA)

---

**Créé avec ❤️ et Next.js**

*Un blog fait pour durer 20 ans !*