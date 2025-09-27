import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://enverse-blog.vercel.app'), // Remplacez par votre domaine réel lors du déploiement
  title: 'Enverse | Blog Personnel - IA, Data Science & Réflexions',
  description: 'Articles sur l\'IA, la data science, mes projets et réflexions personnelles',
  keywords: 'blog, IA, intelligence artificielle, data science, projets, réflexions',
  authors: [{ name: 'Calixte Raoul T. HOUNGBO' }],
  creator: 'Calixte Raoul T. HOUNGBO',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-domaine.com',
    title: 'Enverse - Blog Personnel',
    description: 'Articles sur l\'IA, la data science et mes réflexions personnelles',
    siteName: 'Enverse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enverse - Blog Personnel',
    description: 'Articles sur l\'IA, la data science et mes réflexions personnelles',
    creator: '@raoulcalixte',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}