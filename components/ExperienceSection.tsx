'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slideUpFadeIn } from '@/lib/animations'

import { Dictionary } from '@/dictionaries/get-dictionary'

interface ExperienceSectionProps {
  experiences: Dictionary['experience']
  dict: Dictionary['experience_section']
}

export default function ExperienceSection({ experiences, dict }: ExperienceSectionProps) {
  const [selectedId, setSelectedId] = useState(experiences[0]?.id)

  const selected = experiences.find((exp) => exp.id === selectedId)

  return (
    <section id="experience" className="py-20 lg:py-32 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{dict.title}</h2>
        <p className="text-muted-foreground max-w-lg">
          {dict.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Companies List (Tabs) */}
        <motion.div
          className="lg:col-span-1 space-y-2"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {experiences.map((exp, index) => (
            <motion.button
              key={exp.id}
              onClick={() => setSelectedId(exp.id)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                opacity: { delay: index * 0.1, duration: 0.4 },
                x: { delay: index * 0.1, duration: 0.4 }
              }}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                selectedId === exp.id
                  ? 'bg-accent/10 border border-accent text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
              whileHover={{ 
                x: 8,
                transition: { type: "tween", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="font-bold text-sm tracking-wide">{exp.company}</p>
              <p className="text-xs text-muted-foreground mt-1 opacity-80">{exp.role}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Experience Details Content */}
        <motion.div
          className="lg:col-span-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpFadeIn}
        >
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selected.role}</h3>
                  <p className="text-accent-foreground font-semibold mt-1">{selected.company}</p>
                  <p className="text-sm text-muted-foreground mt-2">{selected.period}</p>
                </div>

                <p className="text-foreground leading-relaxed">{selected.description}</p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm">{dict.highlightsTitle}</h4>
                  <ul className="space-y-2">
                    {selected.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="text-accent font-bold min-w-fit">→</span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-accent-foreground/90 hover:gap-3 transition-all font-semibold text-sm"
                  >
                    {dict.relatedProjects}
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
