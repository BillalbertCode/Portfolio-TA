import LeftSidebar from '@/components/LeftSidebar'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import Footer from '@/components/Footer'
import { getDictionary, Locale } from '@/dictionaries/get-dictionary'
import Image from 'next/image'
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <div className="bg-background text-foreground min-h-screen">
      <LeftSidebar dict={dict} lang={lang as Locale} />

      {/* Main Content */}
      <main className="lg:ml-60 px-4 sm:px-6 lg:px-12">
        {/* Background Image Container - Optimized z-indexing */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Deep Overlay for contrast - Reduced opacity to 0.6 for better visibility */}
        <div className="absolute inset-0 bg-background/60 z-10" />
        
        {/* Gradient mask to blend into the rest of the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background z-20" />
        
        <Image
          src="/Backgrounds/ZANGETSU/ZANGETSU.webp"
          alt="Zangetsu Background"
          fill
          priority
          className="object-cover blur-sm scale-105 opacity-70 transition-opacity duration-1000"
        />
      </div>
        <HeroSection dict={dict.hero} />
        <ProjectsSection 
          dict={dict.projects_section}
          projects={dict.projects} 
          technologies={dict.technologies}
        />
        <ExperienceSection 
          dict={dict.experience_section}
          experiences={dict.experience} 
        />
        <Footer dict={dict.footer} sidebar={dict.sidebar} />
      </main>
    </div>
  )
}
