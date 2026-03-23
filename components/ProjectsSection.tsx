'use client'

import { AnimatePresence, m } from 'framer-motion'
import Image from 'next/image'
import { useMemo,useState } from 'react'

import { Dictionary } from '@/dictionaries/get-dictionary'
import { staggerContainer, staggerItem } from '@/lib/animations'

import { SimpleIcon } from './SimpleIcon'

const EMPTY_TECH: Dictionary['technologies'] = []

interface ProjectsSectionProps {
  projects: Dictionary['projects']
  dict: Dictionary['projects_section']
  technologies?: Dictionary['technologies']
}

export default function ProjectsSection({ projects, dict, technologies = EMPTY_TECH }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  // Memoize technologies list calculation to prevent re-renders during animations
  const uniqueTechs = useMemo(() => 
    Array.from(new Map(technologies.map(t => [t.name, t])).values()),
    [technologies]
  )

  const filteredProjects = useMemo(() => {
    if (!activeFilter || activeFilter === 'All') {
      return projects
    }
    return projects.filter((p) => p.tags.includes(activeFilter))
  }, [projects, activeFilter])

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 2)

  return (
    <section id="projects" className="py-16 lg:py-32 space-y-10 lg:space-y-12 overflow-x-hidden scroll-mt-20">
      <m.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{dict.title}</h2>
        <p className="text-muted-foreground max-w-lg text-sm lg:text-base">
          {dict.description}
        </p>
      </m.div>

      {/* Technology Filters - Fixed jumping with layout and stable animations */}
      <m.div
        layout
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex flex-wrap gap-2 lg:gap-3 origin-top"
      >
        <m.button
          layout
          key="filter-all"
          onClick={() => setActiveFilter('All')}
          variants={staggerItem}
          className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors ${
            activeFilter === 'All'
              ? 'bg-accent text-accent-foreground shadow-md'
              : 'bg-muted/50 text-foreground hover:bg-muted'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {dict.all}
        </m.button>

        {uniqueTechs.map((tech) => (
          <m.button
            layout
            key={`filter-${tech.name}`}
            onClick={() => setActiveFilter(tech.name)}
            variants={staggerItem}
            className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5 lg:gap-2 ${
              activeFilter === tech.name
                ? 'bg-accent text-accent-foreground shadow-md'
                : 'bg-muted/50 text-foreground hover:bg-muted'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SimpleIcon name={tech.icon} size={14} />
            <span>{tech.name}</span>
          </m.button>
        ))}
      </m.div>

      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <m.div
              key="empty-state"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="py-12 text-center w-full"
            >
              <p className="text-muted-foreground">{dict.noProjects}</p>
            </m.div>
          ) : (
            <m.div
              key="projects-list"
              layout
              className="flex flex-col gap-12 lg:gap-16 w-full overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleProjects.map((project) => (
                  <m.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      opacity: { duration: 0.2 }
                    }}
                    className="group flex flex-col md:flex-row gap-6 lg:gap-8 items-center md:items-start"
                  >
                    {/* Image with shadow, no border/bg */}
                    <div className="relative w-full md:w-72 aspect-video shrink-0 overflow-hidden rounded shadow-2xl shadow-black/20">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col justify-center grow space-y-4 lg:space-y-5 py-1">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground transition-colors duration-300 text-center md:text-left">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 lg:mt-3 text-sm lg:text-base max-w-2xl leading-relaxed text-center md:text-left">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={`${project.id}-tag-${tagIndex}`}
                            className="px-2 py-1 text-[10px] lg:text-xs text-accent-foreground/70 border border-accent/80 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4 lg:gap-6">
                        {project.github && (
                           <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm lg:text-md text-muted-foreground hover:text-foreground transition-all font-semibold "
                          >
                            <SimpleIcon name="github" size={18} />
                            {dict.viewGithub}
                          </a> 
                        )}
                        
                        {project.link && (
                           <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm lg:text-md text-accent-foreground/95 hover:gap-3 transition-all font-semibold "
                          >
                            {dict.view} 
                            <span className="text-lg lg:text-xl">→</span>
                          </a> 
                        )}

                        
                      </div>
                    </div>
                  </m.div>
                ))}
              </AnimatePresence>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {filteredProjects.length > 2 && (
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted/50 transition-colors font-semibold text-sm"
          >
            {showAll ? dict.showLess : `${dict.showMore} (${filteredProjects.length - 2})`}
          </button>
        </m.div>
      )}
    </section>
  )
}
