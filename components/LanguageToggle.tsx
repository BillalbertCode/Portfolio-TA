'use client'

import { useLanguage } from '@/context/language-context'
import { motion } from 'framer-motion'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-full border border-border w-fit">
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'es' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'en' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      
      {/* Indicador animado opcional si prefieres un estilo de switch */}
      <motion.div 
        layout
        className="sr-only" 
      />
    </div>
  )
}
