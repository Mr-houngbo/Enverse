"use client";

import Head from 'next/head';
import { Github, Twitter, Linkedin, Mail, MapPin, Calendar, X } from 'lucide-react';
import Image from 'next/image';
import { InteractivePhoto } from '@/components/interactive-photo';
import { useState } from 'react';

export default function AboutPage() {
  const [selectedCertification, setSelectedCertification] = useState<any>(null);
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Mr-houngbo', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/raoulcalixte', icon: Twitter },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/calixte-raoul-t-houngbo-330561249/', icon: Linkedin },
    { name: 'Email', href: 'mailto:houngbo.calixte.r@gmail.com', icon: Mail },
  ];

  const skills = [
    'Python',
    'C/C++',
    'R',
    'Rédaction d\'articles',
    'Création de dashboards dynamiques avec Excel',
    'Analyse de données avec Python',
    'Leadership & Force de proposition',
    'Curiosité',
    'Autonomie',
  ];

  const languages = [
    { name: 'Japonais', level: 'A1', color: 'bg-orange-400' },
    { name: 'Anglais', level: 'B2', color: 'bg-orange-500' },
    { name: 'Français', level: 'Courant', color: 'bg-orange-600' }
  ];

  const interests = [
    'Musique',
    'Mangas & Animés',
    'Géopolitique',
    'Histoire',
    'Philosophie',
    'Langues (Polyglottisme)',
  ];

  const certifications = [
    {
      id: 'bootcamp-usd',
      title: 'Bootcamp USD - Data Science',
      organization: 'United Student Developers',
      date: '7 Juillet - 7 Septembre 2025',
      description: 'Bootcamp en ligne de 2 mois sur la Data Science, projet final Smart Invest',
      detailedDescription: 'Programme intensif de 2 mois organisé par United Student Developers. Formation complète en Data Science avec apprentissage pratique des concepts avancés, techniques d\'analyse de données, visualisation et modélisation prédictive. Projet final : développement de l\'application Smart Invest, plateforme d\'investissement intelligent utilisant l\'IA pour optimiser les décisions d\'investissement.',
      image: '/images/cert-bootcamp-usd.svg',
      ceremonyImage: '/images/cert-bootcamp-usd.svg',
      icon: '🚀',
      thumbnailImage: '/images/cert-bootcamp-usd.svg'
    },
    {
      id: 'ctia',
      title: 'Conçois ton Intelligence Artificielle (CTIA)',
      organization: 'MTN BÉNIN',
      date: 'Mars 2023',
      description: 'Initiation à l\'IA : Machine Learning, Reinforcement Learning, Programmation Python',
      detailedDescription: 'Formation complète sur les fondamentaux de l\'intelligence artificielle dispensée par MTN Bénin. Ce programme m\'a permis d\'acquérir les bases essentielles du Machine Learning, du Reinforcement Learning et de la programmation Python appliquée à l\'IA.',
      image: '/images/cert-ctia.svg',
      ceremonyImage: '/images/cert-ctia.svg',
      icon: '🤖',
      thumbnailImage: '/images/cert-ctia.svg'
    },
    {
      id: 'community-manager',
      title: 'Top Community Manager',
      organization: 'MTN BÉNIN',
      date: 'Septembre 2024',
      description: 'Gestion de réseaux sociaux, création de contenus engageants, animation et modération de communautés, analyse de données sociales, campagnes d\'influence',
      detailedDescription: 'Certification complète en gestion de communauté digitale. Formation intensive sur la stratégie de contenu, l\'engagement communautaire, l\'analyse de données sociales et la gestion de campagnes d\'influence. Compétences acquises : gestion multi-plateformes, création de contenu viral, modération avancée et analytics sociaux.',
      image: '/images/cert-community-manager.svg',
      ceremonyImage: '/images/cert-community-manager.svg',
      icon: '👥',
      thumbnailImage: '/images/cert-community-manager.svg'
    },
    {
      id: 'ia-nlp-datascience',
      title: 'IA & NLP | Data Science',
      organization: 'FORCE - N',
      date: 'Janvier - Juillet 2025',
      description: 'Machine Learning, NLP, Deep Learning, Mathématiques pour l\'IA, Analyse & Visualisation (Pandas, Seaborn)',
      detailedDescription: 'Programme avancé en Intelligence Artificielle et Science des Données. Formation approfondie sur le Machine Learning, le Traitement du Langage Naturel (NLP), le Deep Learning, les mathématiques appliquées à l\'IA, et l\'analyse/visualisation de données avec Pandas et Seaborn.',
      image: 'https://drive.google.com/uc?export=view&id=1Pp9o1gJHtlDP71PCvrzz_tDc6_6VDm83',
      ceremonyImage: '/images/cert-ia-nlp.svg',
      icon: '📊',
      thumbnailImage: '/images/cert-ia-nlp.svg'
    }
  ];

  const experience = [
    {
      title: 'Étudiant en Master Finance Digitale',
      company: 'Ecole Supérieure Multinationale T. Dakar',
      period: '2024 - 2026',
      description: 'Master en Management de la Transformation Digitale, spécialité Finance Digitale. Formation en transformation digitale et finance numérique, avec un focus sur l\'application des technologies émergentes aux problématiques financières africaines.',
    },
    {
      title: 'Licence en Mathématiques Fondamentales (FAST)',
      company: 'Université d\'Abomey-Calavi (UAC BÉNIN)',
      period: '2024',
      description: 'Formation rigoureuse en mathématiques pures constituant une base solide pour les sciences de données et l\'intelligence artificielle.',
    },
  ];

  return (
    <>
      <Head>
        <title>À propos - Calixte Raoul T. HOUNGBO | Enverse</title>
        <meta name="description" content="Découvrez le profil de Calixte Raoul T. HOUNGBO, étudiant en Master Finance Digitale, passionné par l'IA et la data science." />
        <meta name="keywords" content="Calixte Raoul HOUNGBO, profil, IA, data science, Sénégal, Dakar" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Calixte Raoul T. HOUNGBO",
              "givenName": "Calixte Raoul",
              "familyName": "HOUNGBO",
              "jobTitle": "Étudiant en Master Finance Digitale",
              "description": "Étudiant en Master Finance Digitale à l'Université de Dakar, passionné par l'intelligence artificielle, la data science et les technologies émergentes.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dakar",
                "addressCountry": "Sénégal"
              },
              "sameAs": [
                "https://github.com/Mr-houngbo",
                "https://twitter.com/raoulcalixte",
                "https://www.linkedin.com/in/calixte-raoul-t-houngbo-330561249/",
                "https://enverse.vercel.app"
              ],
              "knowsAbout": [
                "Intelligence Artificielle",
                "Data Science",
                "Python",
                "Machine Learning",
                "Finance Digitale",
                "Automatisation"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Université de Dakar"
              },
              "url": "https://enverse.vercel.app/about"
            })
          }}
        />
      </Head>

      {/* Certification Modal */}
      {selectedCertification && selectedCertification.title && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCertification(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {/* Header with close button */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCertification.title}
                </h3>
                <button
                  onClick={() => setSelectedCertification(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Fermer la modal"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Certification Image */}
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src={selectedCertification.image}
                        alt={`Certification ${selectedCertification.title}`}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/cert-placeholder.svg';
                        }}
                      />
                    </div>

                    {/* Ceremony Image if available */}
                    {selectedCertification.ceremonyImage && (
                      <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <Image
                          src={selectedCertification.ceremonyImage}
                          alt={`Cérémonie de remise ${selectedCertification.title}`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/ceremony-placeholder.svg';
                          }}
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                          Photo de la cérémonie de graduation
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-4xl">{selectedCertification.icon}</span>
                      <div>
                        <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                          {selectedCertification.organization}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedCertification.date}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Description du programme
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {selectedCertification.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Détails et compétences acquises
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {selectedCertification.detailedDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
                        className="group p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/50 transition-all duration-300 hover:scale-110 animate-fade-in"
                        aria-label={link.name}
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
                  <strong className="text-orange-600 dark:text-orange-400">Passionné par les données et l'intelligence artificielle,</strong> je suis un étudiant en Master Finance Digitale à l'ESMT Dakar,
                  avec une solide formation en mathématiques fondamentales.
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  Mon parcours m'a permis d'acquérir des compétences techniques en <strong className="text-orange-600 dark:text-orange-400">Python, C/C++, R</strong> et dans l'analyse de données,
                  tout en développant un intérêt marqué pour la <strong className="text-orange-600 dark:text-orange-400">transformation digitale</strong>.
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  J'explore, je code, je connecte.<br />
                  Avec Python, HTML/CSS, R et C++, je construis peu à peu un socle solide pour concevoir demain des outils accessibles et porteurs de sens, ancrés dans les réalités africaines.
                </p>

                <p className="text-gray-700 dark:text-gray-300 border-t border-orange-200 dark:border-orange-800/50 pt-6 mt-8">
                  Ce qui me guide, c'est l'envie d'apprendre vite, de bâtir proprement, et de toujours créer du sens.<br />
                  <span className="text-orange-600 dark:text-orange-400 font-medium">Chaque ligne de code, chaque analyse, chaque projet contribue à ma vision d'une technologie au service de l'humain.</span>
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

        {/* Professional Experience */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Expérience<span className="text-orange-500 dark:text-orange-400">s</span> Professionnelles
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
            </div>

            <div className="space-y-8">
              {/* Formateur SMART OTOBOS CONSULTING */}
              <div className="group p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-sm hover:shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
                    Formateur prompt engineering IA | ChatGPT
                  </h3>
                  <span className="text-sm px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 font-medium mt-2 lg:mt-0 self-start lg:self-auto">
                    Octobre 2024 - Mars 2025
                  </span>
                </div>
                <p className="text-orange-600 dark:text-orange-400 font-semibold text-lg mb-4">
                  SMART OTOBOS CONSULTING
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Formation spécialisée sur l'ingénierie des prompts pour l'intelligence artificielle, avec un focus sur ChatGPT et les techniques avancées de prompt engineering.
                </p>
              </div>

              
            </div>
          </div>
        </section>

        {/* Languages & Interests */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/30 dark:via-transparent dark:to-gray-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Languages */}
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Lan<span className="text-orange-500 dark:text-orange-400">gues</span>
                  </h2>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
                </div>

                <div className="space-y-6">
                  {languages.map((language, index) => (
                    <div
                      key={language.name}
                      className="group p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
                          {language.name}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${language.color}`}>
                          {language.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full transition-all duration-300 ${
                          language.level === 'Courant' ? 'w-full bg-orange-600' :
                          language.level === 'B2' ? 'w-3/4 bg-orange-500' : 'w-1/4 bg-orange-400'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Centres d'<span className="text-orange-500 dark:text-orange-400">Intérêt</span>
                  </h2>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest, index) => (
                    <div
                      key={interest}
                      className="group p-4 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-lg hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-md text-center"
                    >
                      <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
                        {interest}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Certific<span className="text-orange-500 dark:text-orange-400">ations</span> & Formations
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification, index) => (
                <div
                  key={certification.id}
                  className="group p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg text-center cursor-pointer"
                  onClick={() => setSelectedCertification(certification)}
                >
                  {/* Thumbnail Image */}
                  <div className="w-full h-32 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src={certification.thumbnailImage}
                      alt={certification.title}
                      width={300}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/images/cert-placeholder.svg';
                      }}
                    />
                  </div>

                  <div className="w-12 h-12 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{certification.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
                    {certification.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{certification.organization}</p>
                  <span className="inline-block px-3 py-1 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 text-xs font-medium">
                    {certification.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteering & Associations */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/30 dark:via-transparent dark:to-gray-900/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Vie Associ<span className="text-orange-500 dark:text-orange-400">ative</span> & Bénévolat
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
            </div>

            <div className="space-y-8">
              {/* ISOC ESMT - Communication */}
              <div className="group p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-sm hover:shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
                    Responsable Communication
                  </h3>
                  <span className="text-sm px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 font-medium mt-2 lg:mt-0 self-start lg:self-auto">
                    Février 2025 - Présent
                  </span>
                </div>
                <p className="text-orange-600 dark:text-orange-400 font-semibold text-lg mb-4">
                  ISOC ESMT
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Gestion de la communication et des relations publiques pour l'organisation étudiante ISOC ESMT. Promotion des événements tech et développement de la communauté étudiante.
                </p>
              </div>

              {/* Mentorat et Formation */}
              <div className="group p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-sm hover:shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors duration-300">
                    Mentorat en Programmation
                  </h3>
                  <span className="text-sm px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 font-medium mt-2 lg:mt-0 self-start lg:self-auto">
                    2024 - Présent
                  </span>
                </div>
                <p className="text-orange-600 dark:text-orange-400 font-semibold text-lg mb-4">
                  Accompagnement Étudiants
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Mentorat bénévole pour accompagner les étudiants débutants dans l'apprentissage de Python et des bases de l'analyse de données. Organisation de sessions de tutorat régulières.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Objective */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Objectif<span className="text-orange-500 dark:text-orange-400">s</span> Professionnels
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mx-auto"></div>
            </div>

            <div className="p-12 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-3xl hover:border-orange-300 dark:hover:border-orange-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  <strong className="text-orange-600 dark:text-orange-400">Passionné d'analyse de données</strong> avec plusieurs projets personnels réalisés,
                  prêt à apporter ma <strong className="text-orange-600 dark:text-orange-400">curiosité analytique</strong> et ma <strong className="text-orange-600 dark:text-orange-400">rigueur technique</strong> à une équipe.
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-center">
                  <strong className="text-orange-600 dark:text-orange-400">Déterminé à transformer chaque défi en opportunité d'apprentissage</strong>,
                  je cherche à contribuer à des projets innovants où je peux appliquer mes compétences en data science et intelligence artificielle.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <span className="px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 text-sm font-medium">
                    📊 Data Analysis
                  </span>
                  <span className="px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 text-sm font-medium">
                    🤖 Intelligence Artificielle
                  </span>
                  <span className="px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 text-sm font-medium">
                    📈 Visualisation de Données
                  </span>
                  <span className="px-4 py-2 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/50 rounded-full text-orange-600 dark:text-orange-300 text-sm font-medium">
                    🚀 Innovation Technologique
                  </span>
                </div>
              </div>
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
    </>
  );
}