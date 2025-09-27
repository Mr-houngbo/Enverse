import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Mr-houngbo', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/raoulcalixte', icon: Twitter },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/calixte-raoul-t-houngbo-330561249/', icon: Linkedin },
    { name: 'Email', href: 'mailto:houngbo.calixte.r@gmail.com', icon: Mail },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-secondary dark:text-secondary-dark text-sm">
            © {currentYear} - Calixte Raoul T. HOUNGBO. Tous droits réservés.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  aria-label={link.name}
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <Link href="/rss.xml" className="text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark transition-colors">
              RSS
            </Link>
            <Link href="/sitemap.xml" className="text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}