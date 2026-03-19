'use client'

import { motion, Variants } from 'framer-motion'
import dynamic from 'next/dynamic'
import React from 'react'
import { SiNodedotjs, SiReact, SiTypescript } from 'react-icons/si'

import { Button } from '@/components/ui/button'
import { Dictionary } from '@/dictionaries/get-dictionary'
import { staggerItem } from '@/lib/animations'

const ModelComponent = dynamic(
  () => import('./ModelViewer'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-96 bg-accent/5 animate-pulse rounded-2xl" /> 
  }
)

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.5,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
  hover: {
    scale: 1.15,
    rotate: 5,
    y: -3,
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 10,
      delay: 0
    },
  },
  tap: { scale: 0.95 },
}

const techStack = [
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', bg: 'bg-accent/20' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', bg: 'bg-accent/20' },
  { name: 'React', icon: SiReact, color: '#61DAFB', bg: 'bg-accent/20' },
]

interface HeroSectionProps {
  dict: Dictionary['hero']
  name: Dictionary['name']
  email: Dictionary['email']
  lang: string
}

export default function HeroSection({ dict, name, email, lang }: HeroSectionProps) {
  const resumeUrl = `/resume/Martinez-Billalbert-${lang.toUpperCase()}.pdf`

  return (
    <section id="home" className="relative min-h-[calc(100vh-64px)] lg:min-h-screen flex items-center py-8 lg:py-12 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 lg:space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <motion.div variants={staggerItem} className="flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase text-accent/80">
                {dict.welcome}
              </span>
            </motion.div>

            <div className="space-y-2">
              <motion.h1 
                variants={staggerItem}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
              >
                {name}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="text-xl lg:text-2xl italic bg-linear-to-r from-primary-foreground to-primary/80 bg-clip-text text-transparent"
              >
                {dict.title}
              </motion.p>
            </div>

            <motion.p
              variants={staggerItem}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {dict.description}
            </motion.p>
          </div>

          <motion.div variants={staggerItem} className="flex gap-3 flex-wrap justify-center lg:justify-start pt-2">
            <Button size="lg" className="bg-accent border border-transparent hover:border-ring hover:bg-accent/50 rounded px-6 lg:px-8 h-11 lg:h-12 text-sm lg:text-base" asChild>
              <a href="#projects">{dict.viewWork}</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-md px-6 lg:px-8 h-11 lg:h-12 border-border/50 hover:bg-accent/5 text-sm lg:text-base" asChild>
              <a href={`mailto:${email}`}>{dict.getInTouch}</a>
            </Button>
            <Button size="lg" variant="ghost" className="rounded-md px-6 lg:px-8 h-11 lg:h-12 border border-border/50 hover:bg-accent/5 text-sm lg:text-base" asChild>
              <a href={resumeUrl} download>{dict.downloadResume}</a>
            </Button>
          </motion.div>

          {/* Experience Stat & Tech Icons Grouped */}
          <motion.div 
            variants={staggerItem}
            className="pt-6 lg:pt-8 border-t border-border flex flex-row items-center justify-center lg:justify-start gap-8 lg:gap-10"
          >
            <div className="space-y-1 text-left">
              <p className="text-2xl lg:text-3xl font-bold text-foreground leading-none">3+</p>
              <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 whitespace-nowrap">
                {dict.stats.experience}
              </p>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconVariants}
                  className={`flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-xl border border-border/20 ${tech.bg} backdrop-blur-sm transition-colors duration-300`}
                  title={tech.name}
                >
                  <tech.icon size={20} color={tech.color} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content (3D Model) */}
        <div className="relative h-[300px] lg:h-full min-h-[300px] lg:min-h-96 flex items-center justify-center order-first lg:order-last">
          <div className="w-full h-full relative z-10">
            <ModelComponent />
          </div>
          {/* Subtle glow behind the model on mobile */}
          <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full lg:hidden" />
        </div>
      </div>
    </section>
  )
}
