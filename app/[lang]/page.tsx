import { domAnimation,LazyMotion } from 'framer-motion'
import { Metadata } from 'next'

import EducationSection from '@/components/EducationSection'
import ExperienceSection from '@/components/ExperienceSection'
import Footer from '@/components/Footer'
import { ImmersionZone } from '@/components/ImmersionZone'
import MobileHeader from '@/components/MobileHeader'
import ProjectsSection from '@/components/ProjectsSection'
import { getDictionary, Locale } from '@/dictionaries/get-dictionary'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  
  return {
    title: dict.seo.title,
    description: dict.seo.description,
    keywords: dict.seo.keywords,
    icons: {
      icon: '/icon.svg',
      apple: '/icon.svg',
    },
    authors: [{ name: dict.name, url: 'https://github.com/BillalbertCode' }],
    creator: dict.name,
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url: `https://billalbertcode.vercel.app/${lang}`,
      siteName: 'Billalbert Martinez Portfolio',
      images: [
        {
          url: 'https://avatars.githubusercontent.com/u/156066236',
          width: 400,
          height: 400,
          alt: dict.name,
        },
      ],
      locale: lang === 'es' ? 'es_VE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: dict.seo.twitter.title,
      description: dict.seo.twitter.description,
      site: '@BillalbertCode',
      creator: '@BillalbertCode',
      images: ['https://avatars.githubusercontent.com/u/156066236'],
    },
    alternates: {
      canonical: `https://billalbertcode.vercel.app/${lang}`,
      languages: {
        'en-US': 'https://billalbertcode.vercel.app/en',
        'es-ES': 'https://billalbertcode.vercel.app/es',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-background text-foreground min-h-screen">
        {/* Mobile Header (visible only on small screens) - Moved to root for global stickiness */}
        <MobileHeader dict={dict} lang={lang as Locale} />

        {/* 1. Atmospheric Wrapper (Immersion Zone) */}
        <ImmersionZone dict={dict} lang={lang as Locale} />

        {/* 2. Main Content Zone (Normal Background) */}
        <main className="lg:ml-60 px-4 sm:px-6 lg:px-12 relative z-10 bg-background">
          <ProjectsSection 
            dict={dict.projects_section}
            projects={dict.projects} 
            technologies={dict.technologies}
          />
          <ExperienceSection 
            dict={dict.experience_section}
            experiences={dict.experience} 
          />
          <EducationSection 
            dict={dict.education_section}
            education={dict.education}
            courses={dict.courses}
          />
          <Footer 
            dict={dict.footer} 
            common={dict.common} 
            credits={dict.credits}
            title={dict.title} 
            email={dict.email} 
            name={dict.name} 
          />
        </main>
      </div>
    </LazyMotion>
  )
}
