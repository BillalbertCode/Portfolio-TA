'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { slideUpFadeIn, slideInRight } from '@/lib/animations'
import { Button } from '@/components/ui/button'
import { SiTypescript, SiNodedotjs, SiReact } from 'react-icons/si'

const ModelComponent = dynamic(
  () => import('./ModelViewer'),
  { ssr: false }
)

import { Dictionary } from '@/dictionaries/get-dictionary'

interface HeroSectionProps {
  dict: Dictionary['hero']
}

export default function HeroSection({ dict }: HeroSectionProps) {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        // The delay here is for the initial mount animation
        delay: 0.7 + i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    }),
    hover: {
      scale: 1.1,
      rotate: 5,
      y: -5,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 15,
        // Override the visible transition to remove the delay when hovering
        delay: 0 
      },
    },
    tap: { scale: 0.95 },
  }

  const techStack = [
    { 
      name: 'TypeScript', 
      icon: SiTypescript, 
      bgColor: 'bg-[#3178C6]/10', 
      iconColor: '#3178C6',
      borderColor: 'border-[#3178C6]/20'
    },
    { 
      name: 'Node.js', 
      icon: SiNodedotjs, 
      bgColor: 'bg-[#339933]/10', 
      iconColor: '#339933',
      borderColor: 'border-[#339933]/20'
    },
    { 
      name: 'React', 
      icon: SiReact, 
      bgColor: 'bg-[#61DAFB]/10', 
      iconColor: '#61DAFB',
      borderColor: 'border-[#61DAFB]/20'
    }
  ]

  return (
    <section id="home" className="relative flex items-center min-h-[calc(100vh-80px)] lg:min-h-screen py-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpFadeIn}
          className="space-y-6"
        >
          <div className="space-y-3">
            <motion.p
              className="text-sm text-accent-foreground/90 font-semibold tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {dict.welcome}
            </motion.p>
            <motion.h2
              className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {dict.title}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {dict.description}
            </motion.p>
          </div>

          <motion.div
            className="flex gap-3 flex-wrap pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <a href="#projects">{dict.viewWork}</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:billalbertcode@gmail.com">{dict.getInTouch}</a>
            </Button>
          </motion.div>

          {/* Experience Stat & Animated Tech Icons */}
          <div className="pt-8 border-t border-border flex items-center gap-10">
            <motion.div
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-2xl font-bold text-foreground">5+</p>
              <p className="whitespace-nowrap text-xs uppercase tracking-tighter opacity-70">{dict.stats.experience}</p>
            </motion.div>

            {/* Tech Icons with Backgrounds */}
            <div className="flex items-center gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconVariants}
                  // Using transition={{ delay: 0 }} on the motion.div to ensure no inherited delay on return
                  transition={{ delay: 0 }}
                  className={`flex items-center justify-center w-12 h-12 rounded-xl border ${tech.bgColor} ${tech.borderColor} transition-colors duration-300`}
                  title={tech.name}
                >
                  <tech.icon size={24} color={tech.iconColor} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right - 3D Model */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          className="relative h-96 lg:h-full min-h-96 rounded-lg overflow-hidden flex items-center justify-center"
        >
          <ModelComponent />
        </motion.div>
      </div>
    </section>
  )
}
