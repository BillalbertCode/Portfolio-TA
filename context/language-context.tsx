'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'hero.welcome': 'Bienvenido a mi portfolio',
    'hero.title': 'Desarrollador Creativo',
    'hero.description': 'Creo experiencias digitales hermosas e interactivas utilizando tecnologías web modernas. Especializado en React, Node.js y todo lo que hay en medio.',
    'hero.viewWork': 'Ver mi trabajo',
    'hero.getInTouch': 'Contacto',
    'hero.stats.experience': 'Años de Experiencia',
    'hero.stats.projects': 'Proyectos Completados',
    'hero.stats.clients': 'Clientes Felices',
    'projects.title': 'Proyectos Destacados',
    'projects.description': 'Una selección de mis mejores trabajos, mostrando experiencia en diseño, desarrollo y resolución de problemas.',
    'projects.view': 'Ver Proyecto',
    'projects.showMore': 'Mostrar más',
    'projects.showLess': 'Mostrar menos',
    'projects.all': 'Todos',
    'experience.title': 'Experiencia Profesional',
    'contact.connect': 'Conectar',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.description': 'Transformando ideas en soluciones digitales elegantes mediante diseño, desarrollo y resolución creativa de problemas.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'sidebar.title': 'BM',
    'sidebar.subtitle': 'Desarrollador Fullstack',
    'common.loading': 'Cargando portfolio...',
    'common.allProjects': 'Todos los proyectos',
  },
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'hero.welcome': 'Welcome to my portfolio',
    'hero.title': 'Creative Developer',
    'hero.description': 'I craft beautiful, interactive digital experiences using modern web technologies. Specializing in React, Node.js, and everything in between.',
    'hero.viewWork': 'View My Work',
    'hero.getInTouch': 'Get In Touch',
    'hero.stats.experience': 'Years Experience',
    'hero.stats.projects': 'Projects Completed',
    'hero.stats.clients': 'Happy Clients',
    'projects.title': 'Featured Projects',
    'projects.description': 'A selection of my best work, showcasing expertise in design, development, and problem-solving.',
    'projects.view': 'View Project',
    'projects.showMore': 'Show More',
    'projects.showLess': 'Show Less',
    'projects.all': 'All',
    'experience.title': 'Professional Experience',
    'contact.connect': 'Connect',
    'footer.rights': 'All rights reserved.',
    'footer.description': 'Transforming ideas into elegant digital solutions through design, development, and creative problem-solving.',
    'footer.quickLinks': 'Quick Links',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'sidebar.title': 'BM',
    'sidebar.subtitle': 'Fullstack Developer',
    'common.loading': 'Loading portfolio...',
    'common.allProjects': 'All Projects',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang)
    } else {
      const browserLang = navigator.language.split('-')[0] as Language
      if (browserLang === 'es' || browserLang === 'en') {
        setLanguageState(browserLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
