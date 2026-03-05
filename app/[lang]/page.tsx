import LeftSidebar from '@/components/LeftSidebar'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import Footer from '@/components/Footer'
import { getDictionary, Locale } from '@/dictionaries/get-dictionary'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <div className="bg-background text-foreground min-h-screen">
      <LeftSidebar dict={dict} lang={lang as Locale} />

      {/* Main Content */}
      <main className="lg:ml-60 px-4 sm:px-6 lg:px-12">
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
