'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { slideUpFadeIn, slideInRight } from '@/lib/animations'
import { Button } from '@/components/ui/button'

const ModelComponent = dynamic(
  () => import('./ModelViewer'),
  { ssr: false }
)

import { Dictionary } from '@/dictionaries/get-dictionary'

interface HeroSectionProps {
  dict: Dictionary['hero']
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden min-h-screen flex items-center">
      

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
              className="text-sm text-accent font-semibold tracking-wider uppercase"
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
              <a href="#contact">{dict.getInTouch}</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 pt-8 text-sm text-muted-foreground border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div>
              <p className="text-xl font-bold text-foreground">5+</p>
              <p>{dict.stats.experience}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">50+</p>
              <p>{dict.stats.projects}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">30+</p>
              <p>{dict.stats.clients}</p>
            </div>
          </motion.div>
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
