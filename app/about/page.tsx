"use client";

import { Github, Twitter, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import { InteractivePhoto } from '@/components/interactive-photo';

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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      {/* Subtle floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-orange-400/8 dark:bg-orange-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-orange-300/6 dark:bg-orange-300/12 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="w-full py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Profile Image */}
              <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
                <InteractivePhoto
                  src="https://drive.google.com/uc?export=view&id=1-6S6m2GVrPnqjWgClotzJu7YtlRVsZWs"
                  alt="Photo de profil"
                />
              </div>

              {/* Right side - Text content */}
              <div className="text-center lg:text-left space-y-6">
                {/* Name and title with enhanced typography */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 dark:from-white dark:via-orange-100 dark:to-orange-300 leading-tight">
                    Calixte Raoul T. HOUNGBO
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
                    Étudiant en Master Finance Digitale
                  </p>
                </div>

                {/* Location and status */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Dakar, Sénégal</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Actif depuis 2019</span>
                  </div>
                </div>

                {/* Enhanced Social Links */}
                <div className="flex justify-center lg:justify-start space-x-3 pt-2">
                  {socialLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/50 transition-all duration-300 hover:scale-110"
                        aria-label={link.name}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/30 dark:via-transparent dark:to-gray-900/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Ma <span className="text-orange-500 dark:text-orange-400">Mission</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
            </div>

            <div className="p-12 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-3xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-orange-600 dark:text-orange-400">Disclaimer❗ : Ce profil n'est pas ordinaire.</strong> C'est la vitrine d'une vision portée par un jeune passionné de technologie, d'impact et de sens.
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  Après un parcours rigoureux en mathématiques fondamentales, je poursuis aujourd'hui un Master en transformation digitale pour transformer des idées en solutions concrètes et utiles.
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  J'explore, je code, je connecte.<br />
                  Avec Python, HTML/CSS, R et C++, je construis peu à peu un socle solide pour concevoir demain des outils accessibles et porteurs de sens, ancrés dans les réalités africaines.
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  Je me forme activement à l'intelligence artificielle, à l'automatisation, à la visualisation de données, à la gestion de projets digitaux et à l'art de transmettre efficacement via le numérique.
                </p>

                <p className="text-gray-700 dark:text-gray-300 border-t border-orange-200 dark:border-orange-800/50 pt-6 mt-8">
                  Ce qui me guide, c'est l'envie d'apprendre vite, de bâtir proprement, et de toujours créer du sens.<br />
                  <span className="text-orange-600 dark:text-orange-400 font-medium">Je crois en une technologie au service de l'humain. Et chaque ligne de code, chaque idée que je développe, va dans ce sens.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Compé<span className="text-orange-500 dark:text-orange-400">tences</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="group p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg text-center"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/30 dark:via-transparent dark:to-gray-900/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Par<span className="text-orange-500 dark:text-orange-400">cours</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
            </div>

            <div className="space-y-8">
              {experience.map((item, index) => (
                <div key={index} className="group p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-sm hover:shadow-lg">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="text-sm px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 font-medium mt-2 lg:mt-0 self-start lg:self-auto">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-orange-600 dark:text-orange-400 font-semibold text-lg mb-4">
                    {item.company}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-gray-50 to-gray-900 dark:from-gray-900 dark:via-black dark:to-gray-900">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Envie d'<span className="text-orange-500 dark:text-orange-400">échanger</span> ?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                N'hésitez pas à me contacter pour discuter de projets, d'opportunités ou simplement
                pour échanger sur nos passions communes.
              </p>
            </div>

            <a
              href="mailto:houngbo.calixte.r@gmail.com"
              className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
            >
              <Mail className="w-5 h-5 mr-3 group-hover:animate-pulse" />
              Me contacter
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}