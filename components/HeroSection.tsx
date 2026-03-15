'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { SiNodedotjs, SiReact,SiTypescript } from 'react-icons/si'

import { Button } from '@/components/ui/button'
import { slideInRight } from '@/lib/animations'

const ModelComponent = dynamic(
  () => import('./ModelViewer'),
  { ssr: false }
)

import { Dictionary } from '@/dictionaries/get-dictionary'

interface HeroSectionProps {
  dict: Dictionary['hero']
  name: Dictionary['name']
  email: Dictionary['email']
}

export default function HeroSection({ dict, name, email }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.7 + i * 0.1,
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

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] lg:min-h-screen flex items-center py-12 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent/80">
                {dict.welcome}
              </span>
            </motion.div>

            <div className="space-y-1">
              <motion.h1 
                variants={itemVariants}
                className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
              >
                {name}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className=" lg:text-2xl italic bg-linear-to-r from-primary-foreground to-primary/80 bg-clip-text text-5xl text-transparent"
              >
                {dict.title}
              </motion.p>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              {dict.description}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex gap-3 flex-wrap pt-2">
            <Button size="lg" className="bg-accent border border-transparent hover:border-ring hover:bg-accent/50 rounded px-8 h-12" asChild>
              <a href="#projects">{dict.viewWork}</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-md px-8 h-12 border-border/50 hover:bg-accent/5" asChild>
              <a href={`mailto:${email}`}>{dict.getInTouch}</a>
            </Button>
          </motion.div>

          {/* Experience Stat & Tech Icons Grouped */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-border flex items-center gap-10"
          >
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground leading-none">3+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 whitespace-nowrap">
                {dict.stats.experience}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconVariants}
                  transition={{ delay: 0 }}
                  className={`flex items-center justify-center w-11 h-11 rounded-xl border border-border/20 ${tech.bg} backdrop-blur-sm transition-colors duration-300`}
                  title={tech.name}
                >
                  <tech.icon size={22} color={tech.color} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right - 3D Model */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          className="relative h-96 lg:h-full min-h-96 flex items-center justify-center"
        >
          <div className="w-full h-full relative z-10">
            <ModelComponent />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
