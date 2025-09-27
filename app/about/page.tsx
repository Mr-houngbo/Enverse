import { Github, Twitter, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos | Mon parcours et ma mission',
  description: 'Découvrez mon parcours en tant qu\'étudiant béninois en Master de Finance Digitale à Dakar, passionné par la technologie au service de l\'Afrique.',
};

export default function AboutPage() {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Mr-houngbo', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/raoulcalixte', icon: Twitter },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/calixte-raoul-t-houngbo-330561249/', icon: Linkedin },
    { name: 'Email', href: 'mailto:houngbo.calixte.r@gmail.com', icon: Mail },
  ];

  const skills = [
    'Python',
    'HTML/CSS',
    'R',
    'C++',
    'Intelligence Artificielle',
    'Automatisation',
    'Visualisation de Données',
    'Gestion de Projets Digitaux',
    'Transmission Numérique',
  ];

  const experience = [
    {
      title: 'Étudiant en Master 2 Finance Digitale',
      company: 'Université de Dakar',
      period: '2024 - Présent',
      description: 'Formation en transformation digitale et finance numérique, avec un focus sur l\'application des technologies émergentes aux problématiques financières africaines.',
    },
    {
      title: 'Étudiant en Mathématiques Fondamentales',
      company: 'Parcours Académique',
      period: 'Antérieur',
      description: 'Formation rigoureuse en mathématiques pures, constituant une base solide pour les sciences de données et l\'intelligence artificielle.',
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary dark:border-primary-dark mb-8">
          <Image
            src="images/profile.JPG"
            alt="Photo de profil"
            fill
            className="object-cover"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground dark:text-foreground-dark mb-4">
          Salut, moi c'est Calixte Raoul T. HOUNGBO 👋
        </h1>
        
        <div className="flex justify-center items-center space-x-6 text-secondary dark:text-secondary-dark mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Dakar, Sénégal</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Étudiant actif depuis 2019</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg text-secondary hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label={link.name}
              >
                <IconComponent className="h-6 w-6" />
              </a>
            );
          })}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-6">Ma Mission</h2>
        <div className="prose prose-lg dark:prose-dark max-w-none">
          <p className="text-secondary dark:text-secondary-dark leading-relaxed">
            <strong>Disclaimer❗ : Ce profil n'est pas ordinaire.</strong> C'est la vitrine d'une vision portée par un jeune passionné de technologie, d'impact et de sens.
          </p>
          <p className="text-secondary dark:text-secondary-dark leading-relaxed">
            Après un parcours rigoureux en mathématiques fondamentales, je poursuis aujourd'hui un Master en transformation digitale pour transformer des idées en solutions concrètes et utiles.
          </p>
          <p className="text-secondary dark:text-secondary-dark leading-relaxed">
            J'explore, je code, je connecte.<br />
            Avec Python, HTML/CSS, R et C++, je construis peu à peu un socle solide pour concevoir demain des outils accessibles et porteurs de sens, ancrés dans les réalités africaines.
          </p>
          <p className="text-secondary dark:text-secondary-dark leading-relaxed">
            Je me forme activement à l'intelligence artificielle, à l'automatisation, à la visualisation de données, à la gestion de projets digitaux et à l'art de transmettre efficacement via le numérique.
          </p>
          <p className="text-secondary dark:text-secondary-dark leading-relaxed">
            Ce qui me guide, c'est l'envie d'apprendre vite, de bâtir proprement, et de toujours créer du sens.<br />
            Je crois en une technologie au service de l'humain. Et chaque ligne de code, chaque idée que je développe, va dans ce sens.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-6">Compétences</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div key={skill} className="card text-center">
              <span className="font-medium text-foreground dark:text-foreground-dark">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-6">Parcours</h2>
        <div className="space-y-6">
          {experience.map((item, index) => (
            <div key={index} className="card">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground dark:text-foreground-dark">
                  {item.title}
                </h3>
                <span className="text-sm text-secondary dark:text-secondary-dark">
                  {item.period}
                </span>
              </div>
              <p className="text-primary dark:text-primary-dark font-medium mb-3">
                {item.company}
              </p>
              <p className="text-secondary dark:text-secondary-dark">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-6">Philosophie</h2>
        <div className="card bg-gradient-to-r from-primary/10 to-primary-dark/10 dark:from-primary-dark/20 dark:to-primary/20">
          <blockquote className="text-lg italic text-foreground dark:text-foreground-dark leading-relaxed">
            "Ce qui me guide, c'est l'envie d'apprendre vite, de bâtir proprement, et de toujours créer du sens.
            Je crois en une technologie au service de l'humain. Et chaque ligne de code, chaque idée que je développe, va dans ce sens."
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-4">
          Envie d'échanger ?
        </h2>
        <p className="text-secondary dark:text-secondary-dark mb-6">
          N'hésitez pas à me contacter pour discuter de projets, d'opportunités ou simplement 
          pour échanger sur nos passions communes.
        </p>
        <a 
          href="mailto:houngbo.calixte.r@gmail.com" 
          className="btn-primary"
        >
          Me contacter
        </a>
      </section>
    </div>
  );
}