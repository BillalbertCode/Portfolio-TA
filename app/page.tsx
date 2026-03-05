'use client'

import { useState, useEffect } from 'react'
import LeftSidebar from '@/components/LeftSidebar'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/language-context'

interface Technology {
  name: string
  icon: string
}

interface DataType {
  projects: any[]
  experience: any[]
  technologies: Technology[]
}

export default function Home() {
  const [data, setData] = useState<DataType | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const { t } = useLanguage()

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to load data:', err))
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-muted-foreground">{t('common.loading')}</div>
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <LeftSidebar />

      {/* Main Content */}
      <main className="lg:ml-60 px-4 sm:px-6 lg:px-12">
        <HeroSection />
        <ProjectsSection 
          projects={data.projects} 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
          technologies={data.technologies}
        />
        <ExperienceSection experiences={data.experience} />
        <Footer />
      </main>
    </div>
  )
}
