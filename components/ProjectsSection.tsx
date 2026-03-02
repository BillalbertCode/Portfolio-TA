'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import Image from 'next/image'
import { SimpleIcon } from './SimpleIcon'

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  details: string
}

interface Technology {
  name: string
  icon: string
}

interface ProjectsSectionProps {
  projects: Project[]
  activeFilter?: string
  onFilterChange?: (filter: string) => void
  technologies?: Technology[]
}

export default function ProjectsSection({ projects, activeFilter, onFilterChange, technologies = [] }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false)

  const uniqueTechs = Array.from(new Map(technologies.map(t => [t.name, t])).values())

  const filteredProjects = useMemo(() => {
    if (!activeFilter || activeFilter === 'All') {
      return projects
    }
    return projects.filter((p) => p.tags.includes(activeFilter))
  }, [projects, activeFilter])

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 2)

  return (
    <section id="projects" className="py-20 lg:py-32 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
        <p className="text-muted-foreground max-w-lg">
          A selection of my best work, showcasing expertise in design, development, and problem-solving.
        </p>
      </motion.div>

      {/* Technology Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap gap-3"
      >
        <motion.button
          onClick={() => onFilterChange?.('All')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !activeFilter || activeFilter === 'All'
              ? 'bg-accent text-accent-foreground'
              : 'bg-muted/50 text-foreground hover:bg-muted'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          All
        </motion.button>

        {uniqueTechs.map((tech, index) => (
          <motion.button
            key={`tech-${String(tech.name)}`}
            onClick={() => onFilterChange?.(tech.name)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (index + 1) * 0.05 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              activeFilter === tech.name
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted/50 text-foreground hover:bg-muted'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <SimpleIcon name={tech.icon} size={16} />
            <span>{tech.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <p className="text-muted-foreground">No projects match the selected filter.</p>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={staggerItem}
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
                    <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={`${project.id}-tag-${tagIndex}`}
                        className="px-2 py-1 text-xs rounded-md bg-accent/10 text-accent border border-accent/30 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all font-semibold"
                  >
                    View Project
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length > 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted/50 transition-colors font-semibold text-sm"
              >
                {showAll ? 'Show Less' : `Show More (${filteredProjects.length - 2})`}
              </button>
            </motion.div>
          )}
        </>
      )}
    </section>
  )
}
