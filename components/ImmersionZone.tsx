'use client'

import React, { useCallback, useState } from 'react'

import { Dictionary, Locale } from '@/dictionaries/get-dictionary'

import { AtmosphericBackground } from './AtmosphericBackground'
import HeroSection from './HeroSection'
import LeftSidebar from './LeftSidebar'

interface ImmersionZoneProps {
  dict: Dictionary
  lang: Locale
}

export function ImmersionZone({ dict, lang }: ImmersionZoneProps) {
  const [modelReady, setModelReady] = useState(false)
  const [rainReady, setRainReady] = useState(false)

  // Memorize callbacks to prevent unnecessary re-renders of heavy children (3D/Canvas)
  const handleModelLoad = useCallback(() => {
    setModelReady(true)
  }, [])

  const handleRainStarted = useCallback(() => {
    setRainReady(true)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background with Rain */}
      <AtmosphericBackground 
        active={modelReady} 
        onRainStarted={handleRainStarted} 
      />

      {/* Global Sidebar */}
      <LeftSidebar dict={dict} lang={lang} />

      {/* Hero Section with 3D Model */}
      <main className="lg:ml-60 px-4 sm:px-6 lg:px-12 relative z-10">
        <HeroSection 
          dict={dict.hero} 
          email={dict.email} 
          name={dict.name} 
          lang={lang}
          onModelLoad={handleModelLoad}
          isRainReady={rainReady}
        />
      </main>
    </div>
  )
}
