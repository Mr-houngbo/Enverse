import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://enverse.vercel.app'), // Remplacez par votre domaine réel lors du déploiement
  title: 'Calixte Raoul T. HOUNGBO | Enverse - Blog Personnel IA & Data Science',
  description: 'Blog personnel de Calixte Raoul T. HOUNGBO - Articles sur l\'IA, la data science, mes projets et réflexions personnelles',
  keywords: 'Calixte Raoul HOUNGBO, blog, IA, intelligence artificielle, data science, projets, réflexions, Sénégal, Dakar',
  authors: [{ name: 'Calixte Raoul T. HOUNGBO' }],
  creator: 'Calixte Raoul T. HOUNGBO',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://enverse.vercel.app',
    title: 'Calixte Raoul T. HOUNGBO - Enverse Blog Personnel',
    description: 'Blog personnel de Calixte Raoul T. HOUNGBO - Articles sur l\'IA, la data science et mes réflexions personnelles',
    siteName: 'Enverse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calixte Raoul T. HOUNGBO - Enverse Blog Personnel',
    description: 'Blog personnel de Calixte Raoul T. HOUNGBO - Articles sur l\'IA, la data science et mes réflexions personnelles',
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4ESSHRJ967"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4ESSHRJ967');
        `}
      </Script>
      <body className={`${inter.className} overflow-x-hidden`}>
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
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}