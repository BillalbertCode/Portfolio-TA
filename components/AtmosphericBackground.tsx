'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const RainBackground = dynamic(
  () => import('./ui/rain').then(mod => mod.RainBackground),
  { ssr: false }
)

export function AtmosphericBackground() {
  const [showRain, setShowRain] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShowRain(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none h-full w-full">
      {/* Layer 1: Static Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Backgrounds/ZANGETSU/ZANGETSU.webp"
          alt="Zangetsu Background"
          fill
          priority
          sizes="100vw"
          className="object-cover blur-sm scale-105 opacity-60 transition-opacity duration-1000"
        />
        {/* Overlay to darken and add mood */}
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Layer 2: Animated Rain (delayed start to avoid freeze at initial load) */}
      <div className={`transition-opacity duration-1000 ${showRain ? 'opacity-60' : 'opacity-0'}`}>
        {showRain && (
          <RainBackground 
            showBackground={false} 
            intensity={0.8} 
            count={200} 
            lightning={true}
          />
        )}
      </div>

      {/* Layer 3: Deep blending gradient at the bottom to merge with next sections */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background via-background/80 to-transparent z-10" />
    </div>
  )
}
