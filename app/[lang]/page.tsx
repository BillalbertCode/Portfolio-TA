import { AtmosphericBackground } from '@/components/AtmosphericBackground'
import EducationSection from '@/components/EducationSection'
import ExperienceSection from '@/components/ExperienceSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import LeftSidebar from '@/components/LeftSidebar'
import ProjectsSection from '@/components/ProjectsSection'
import { getDictionary, Locale } from '@/dictionaries/get-dictionary'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 1. Atmospheric Wrapper (Immersion Zone) */}
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Fullscreen background that covers sidebar and hero */}
        <AtmosphericBackground />
        
        {/* Global Sidebar (it's fixed, so it will overlay the background) */}
        <LeftSidebar dict={dict} lang={lang as Locale} />

        {/* Hero Section aligned with the atmosphere */}
        <main className="lg:ml-60 px-4 sm:px-6 lg:px-12 relative z-10">
          <HeroSection dict={dict.hero} email={dict.email} name={dict.name} lang={lang} />
        </main>
      </div>

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
        <Footer dict={dict.footer} common={dict.common} title={dict.title} email={dict.email} name={dict.name} />
      </main>
    </div>
  )
}
