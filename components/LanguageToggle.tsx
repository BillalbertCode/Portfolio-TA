'use client'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageToggle() {
  const pathname = usePathname()
  const router = useRouter()
  
  const currentLang = pathname.split('/')[1] || 'es'

  const toggleLanguage = (lang: string) => {
    const segments = pathname.split('/')
    segments[1] = lang
    router.push(segments.join('/'))
  }

  return (
    <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-full border border-border w-fit">
      <button
        onClick={() => toggleLanguage('es')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          currentLang === 'es' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          currentLang === 'en' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      
      <motion.div layout className="sr-only" />
    </div>
  )
}
