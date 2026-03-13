'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { slideUpFadeIn } from '@/lib/animations'
import { Dictionary } from '@/dictionaries/get-dictionary'
import { ExternalLink, Award, GraduationCap } from 'lucide-react'

interface EducationSectionProps {
  education: Dictionary['education']
  courses: Dictionary['courses']
  dict: Dictionary['education_section']
}

export default function EducationSection({ education, courses, dict }: EducationSectionProps) {
  // Combine all items into a single selectable list
  const allItems = useMemo(() => [
    ...education.map(edu => ({ ...edu, type: 'education' as const })),
    ...courses.map(course => ({ ...course, type: 'course' as const }))
  ], [education, courses])

  const [selectedId, setSelectedId] = useState(allItems[0]?.id)
  const [selectedType, setSelectedType] = useState<'education' | 'course'>(allItems[0]?.type)

  const selected = useMemo(() => 
    allItems.find(item => item.id === selectedId && item.type === selectedType),
    [allItems, selectedId, selectedType]
  )

  return (
    <section id="education" className="py-20 lg:py-32 space-y-12">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Selection List (Tabs) */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Education Group */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-3 px-2 flex items-center gap-2">
              <GraduationCap size={14} className="text-accent" />
              {/* Using hardcoded or derived label if not in dict, but dict.title usually covers it */}
              Formal Education
            </h3>
            {education.map((edu, index) => (
              <motion.button
                key={`edu-${edu.id}`}
                onClick={() => {
                  setSelectedId(edu.id)
                  setSelectedType('education')
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border ${
                  selectedId === edu.id && selectedType === 'education'
                    ? 'bg-accent/10 border-accent/50 text-foreground shadow-sm shadow-accent/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="font-bold text-sm tracking-tight line-clamp-1">{edu.school}</p>
                <p className="text-[10px] uppercase tracking-wider text-accent-foreground/70 mt-1 font-semibold">{edu.period}</p>
              </motion.button>
            ))}
          </div>

          {/* Courses Group */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-3 px-2 flex items-center gap-2">
              <Award size={14} className="text-accent" />
              {dict.coursesTitle}
            </h3>
            {courses.map((course, index) => (
              <motion.button
                key={`course-${course.id}`}
                onClick={() => {
                  setSelectedId(course.id)
                  setSelectedType('course')
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border ${
                  selectedId === course.id && selectedType === 'course'
                    ? 'bg-accent/10 border-accent/50 text-foreground shadow-sm shadow-accent/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="font-bold text-sm tracking-tight line-clamp-1">{course.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-accent-foreground/70 mt-1 font-semibold">{course.instructor}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          className="lg:col-span-2 min-h-[350px] relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpFadeIn}
        >
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={`${selectedType}-${selected.id}`}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.3 }}
                className="bg-muted/5 border border-border/50 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start"
              >
                {/* Visual Content */}
                <div className="relative w-full md:w-48 aspect-video md:aspect-square shrink-0 rounded-xl overflow-hidden bg-background/50 border border-border group">
                  {selected.image ? (
                    <Image
                      src={selected.image}
                      alt={'school' in selected ? (selected.school as string) : (selected.name as string)}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                      {selectedType === 'education' ? <GraduationCap size={48} /> : <Award size={48} />}
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                        selectedType === 'education' 
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                          : 'bg-accent/10 border-accent/20 text-accent'
                      }`}>
                        {selectedType}
                      </span>
                      {'expedition' in selected && (
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                          {selected.expedition as string}
                        </span>
                      )}
                      {'period' in selected && (
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                          {selected.period as string}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground leading-tight">
                      {'degree' in selected ? (selected.degree as string) : (selected.name as string)}
                    </h3>
                    <p className="text-accent-foreground font-semibold mt-1">
                      {'school' in selected ? (selected.school as string) : (selected.instructor as string)}
                    </p>
                  </div>

                  {'description' in selected && (
                    <p className="text-foreground/80 leading-relaxed text-sm">
                      {selected.description as string}
                    </p>
                  )}

                  <div className="pt-6 border-t border-border/50 flex flex-wrap gap-4">
                    {'link' in selected && selected.link && (
                      <a
                        href={selected.link as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-accent/80 transition-colors uppercase tracking-widest group"
                      >
                        {dict.viewCertificate}
                        <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
