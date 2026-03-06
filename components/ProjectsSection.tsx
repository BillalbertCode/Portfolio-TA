'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import Image from 'next/image'
import { SimpleIcon } from './SimpleIcon'
import { Dictionary } from '@/dictionaries/get-dictionary'

interface ProjectsSectionProps {
  projects: Dictionary['projects']
  dict: Dictionary['projects_section']
  technologies?: Dictionary['technologies']
}

export default function ProjectsSection({ projects, dict, technologies = [] }: ProjectsSectionProps) {
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
    <section id="projects" className="py-20 lg:py-32 space-y-12 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{dict.title}</h2>
        <p className="text-muted-foreground max-w-lg">
          {dict.description}
        </p>
      </motion.div>

      {/* Technology Filters - Fixed jumping with layout and stable animations */}
      <motion.div
        layout
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex flex-wrap gap-3 origin-top"
      >
        <motion.button
          layout
          key="filter-all"
          onClick={() => setActiveFilter('All')}
          variants={staggerItem}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'All'
              ? 'bg-accent text-accent-foreground'
              : 'bg-muted/50 text-foreground hover:bg-muted'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {dict.all}
        </motion.button>

        {uniqueTechs.map((tech) => (
          <motion.button
            layout
            key={`filter-${tech.name}`}
            onClick={() => setActiveFilter(tech.name)}
            variants={staggerItem}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              activeFilter === tech.name
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted/50 text-foreground hover:bg-muted'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SimpleIcon name={tech.icon} size={16} />
            <span>{tech.name}</span>
          </motion.button>
        ))}
      </motion.div>

      <div className="relative min-h-100">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center w-full"
            >
              <p className="text-muted-foreground">No projects match the selected filter.</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={staggerItem}
                  transition={{ 
                    layout: { duration: 0.4, type: "spring", stiffness: 350, damping: 35 },
                    opacity: { duration: 0.2 }
                  }}
                  className="group rounded-lg overflow-hidden border border-border bg-muted/20 hover:border-accent/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={`${project.id}-tag-${tagIndex}`}
                          className="px-2 py-1 text-xs rounded-md bg-accent/10 text-accent border border-accent/30 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all font-semibold"
                      >
                        {dict.view}
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filteredProjects.length > 2 && (
        <motion.div
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
        </motion.div>
      )}
    </section>
  )
}
