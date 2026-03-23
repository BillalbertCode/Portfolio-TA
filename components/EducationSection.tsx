'use client'

import { AnimatePresence, m } from 'framer-motion'
import { Award, ChevronRight, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { useMemo,useState } from 'react'

import { Dictionary } from '@/dictionaries/get-dictionary'

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
    <section id="education" className="py-16 lg:py-32 space-y-8 lg:space-y-10 overflow-x-hidden scroll-mt-20">
      <m.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center lg:text-left"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{dict.title}</h2>
        <p className="text-muted-foreground text-sm lg:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
          {dict.subtitle}
        </p>
      </m.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14 items-start">
        {/* Selection List (Tabs) */}
        <m.div
          className="lg:col-span-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Education Group */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-foreground mb-2 lg:mb-3 px-2 flex items-center justify-center lg:justify-start gap-2">
              <GraduationCap size={14} className="text-accent" />
              {dict.educationTitle}
            </h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 lg:gap-0.5 pb-2 lg:pb-0 scrollbar-hide">
              {education.map((edu) => (
                <button
                  key={`edu-${edu.id}`}
                  onClick={() => {
                    setSelectedId(edu.id)
                    setSelectedType('education')
                  }}
                  className={`group relative min-w-[120px] lg:w-full text-left px-3 py-3 transition-all duration-300 rounded border lg:border-none ${
                    selectedId === edu.id && selectedType === 'education'
                      ? 'bg-accent/5 border-accent lg:border-transparent'
                      : 'hover:bg-muted/50 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate">
                      <p className={`font-bold text-[11px] lg:text-sm transition-colors duration-300 truncate ${
                        selectedId === edu.id && selectedType === 'education'
                          ? 'text-accent-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        {edu.school}
                      </p>
                      <p className="text-[8px] lg:text-[9px] uppercase tracking-wider text-muted-foreground/50 mt-0.5 font-bold">
                        {edu.period}
                      </p>
                    </div>
                    <ChevronRight 
                      size={12} 
                      className={`hidden lg:block transition-all duration-300 ${
                        selectedId === edu.id && selectedType === 'education'
                          ? 'text-accent translate-x-0 opacity-100'
                          : 'text-muted-foreground -translate-x-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`} 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Courses Group */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-foreground mb-2 lg:mb-3 px-2 flex items-center justify-center lg:justify-start gap-2">
              <Award size={14} className="text-accent" />
              {dict.coursesTitle}
            </h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 lg:gap-0.5 pb-2 lg:pb-0 scrollbar-hide">
              {courses.map((course) => (
                <button
                  key={`course-${course.id}`}
                  onClick={() => {
                    setSelectedId(course.id)
                    setSelectedType('course')
                  }}
                  className={`group relative min-w-[120px] lg:w-full text-left px-3 py-3 transition-all duration-300 rounded-lg border lg:border-none ${
                    selectedId === course.id && selectedType === 'course'
                      ? 'bg-accent/5 border-accent lg:border-transparent'
                      : 'hover:bg-muted/50 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate">
                      <p className={`font-bold text-[11px] lg:text-sm transition-colors duration-300 truncate ${
                        selectedId === course.id && selectedType === 'course'
                          ? 'text-accent-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        {course.name}
                      </p>
                      <p className="text-[8px] lg:text-[9px] uppercase tracking-wider text-muted-foreground/50 mt-0.5 font-bold">
                        {course.instructor}
                      </p>
                    </div>
                    <ChevronRight 
                      size={12} 
                      className={`hidden lg:block transition-all duration-300 ${
                        selectedId === course.id && selectedType === 'course'
                          ? 'text-accent translate-x-0 opacity-100'
                          : 'text-muted-foreground -translate-x-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`} 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </m.div>

        {/* Content Area */}
        <div className="lg:col-span-2 min-h-[300px] lg:min-h-[350px]">
          <AnimatePresence mode="wait">
            {selected && (
              <m.div
                key={`${selectedType}-${selected.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  opacity: { duration: 0.15 }
                }}
                className="flex flex-col md:flex-row gap-6 lg:gap-10 items-center md:items-start"
              >
                {/* Visual Content */}
                <div className="relative w-32 h-32 lg:w-48 lg:h-48 aspect-square shrink-0 rounded-xl overflow-hidden bg-muted/30 border shadow-xl shadow-black/10 group">
                  {selected.image ? (
                    <Image
                      src={selected.image}
                      alt={'school' in selected ? (selected.school as string) : (selected.name as string)}
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="object-cover p-4 lg:p-5 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/5">
                      {selectedType === 'education' ? <GraduationCap size={48} /> : <Award size={48} />}
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-4 lg:space-y-5 py-1 text-center lg:text-left">
                  <div>
                    <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-3">
                      <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-accent/20">
                        {selectedType === 'education' ? dict.academicLabel : dict.certificationLabel}
                      </span>
                      {'period' in selected && (
                        <span className="text-[8px] lg:text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                          {selected.period as string}
                        </span>
                      )}
                      {'expedition' in selected && (
                        <span className="text-[9px] lg:text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                          {selected.expedition as string}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-tight tracking-tight">
                      {'degree' in selected ? (selected.degree as string) : (selected.name as string)}
                    </h3>
                    <p className="text-sm lg:text-base font-bold text-accent-foreground/80 mt-1.5">
                      {'school' in selected ? (selected.school as string) : (selected.instructor as string)}
                    </p>
                  </div>

                  {'description' in selected && (
                    <p className="text-muted-foreground leading-relaxed text-[11px] lg:text-sm max-w-lg mx-auto lg:mx-0">
                      {selected.description as string}
                    </p>
                  )}

                  <div className="pt-4 lg:pt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                    {'link' in selected && selected.link && (
                      <a
                        href={selected.link as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm lg:text-md text-accent-foreground hover:gap-4 transition-all font-semibold "
                      >
                        {dict.viewCertificate}
                        <span className="text-lg lg:text-xl">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
