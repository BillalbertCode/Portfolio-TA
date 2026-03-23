'use client'

import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'

import { Dictionary } from '@/dictionaries/get-dictionary'
import { slideUpFadeIn } from '@/lib/animations'

interface ExperienceSectionProps {
  experiences: Dictionary['experience']
  dict: Dictionary['experience_section']
}

export default function ExperienceSection({ experiences, dict }: ExperienceSectionProps) {
  const [selectedId, setSelectedId] = useState(experiences[0]?.id)

  const selected = experiences.find((exp) => exp.id === selectedId)

  return (
    <section id="experience" className="py-16 lg:py-32 space-y-10 lg:space-y-12 scroll-mt-20">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center lg:text-left"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{dict.title}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 text-sm lg:text-base">
          {dict.subtitle}
        </p>
      </m.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Companies List (Tabs) */}
        <m.div
          className="lg:col-span-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 lg:space-y-2 pb-4 lg:pb-0 scrollbar-hide"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {experiences.map((exp, index) => (
            <m.button
              key={exp.id}
              onClick={() => setSelectedId(exp.id)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                opacity: { delay: index * 0.1, duration: 0.4 },
                x: { delay: index * 0.1, duration: 0.4 }
              }}
              className={`min-w-[140px] lg:w-full text-left px-4 py-3 rounded-lg border transition-all ${
                selectedId === exp.id
                  ? 'bg-accent/10 border-accent text-foreground shadow-sm'
                  : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/30'
              }`}
              whileHover={{ 
                x: typeof window !== 'undefined' && window.innerWidth > 1024 ? 8 : 0,
                transition: { type: "tween", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="font-bold text-xs lg:text-sm tracking-wide truncate">{exp.company}</p>
              <p className="text-[10px] lg:text-xs text-muted-foreground mt-1 opacity-80 truncate">{exp.role}</p>
            </m.button>
          ))}
        </m.div>

        {/* Experience Details Content */}
        <m.div
          className="lg:col-span-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpFadeIn}
        >
          <AnimatePresence mode="wait">
            {selected && (
              <m.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 lg:space-y-6"
              >
                <div className="text-center lg:text-left">
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">{selected.role}</h3>
                  <p className="text-accent-foreground font-semibold mt-1 text-sm lg:text-base">{selected.company}</p>
                  <p className="text-[11px] lg:text-sm text-muted-foreground mt-2 uppercase tracking-widest">{selected.period}</p>
                </div>

                <p className="text-foreground leading-relaxed text-sm lg:text-base text-center lg:text-left">{selected.description}</p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-xs lg:text-sm uppercase tracking-wider text-center lg:text-left">{dict.highlightsTitle}</h4>
                  <ul className="space-y-2 lg:space-y-3">
                    {selected.highlights.map((highlight, index) => (
                      <m.li
                        key={highlight}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3 text-xs lg:text-sm text-muted-foreground"
                      >
                        <span className="text-accent font-bold min-w-fit">→</span>
                        <span>{highlight}</span>
                      </m.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border flex justify-center lg:justify-start">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-accent-foreground/90 hover:gap-3 transition-all font-semibold text-xs lg:text-sm"
                  >
                    {dict.relatedProjects}
                    <span>→</span>
                  </a>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  )
}
