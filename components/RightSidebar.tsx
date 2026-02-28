'use client'

import { motion } from 'framer-motion'
import { slideInRight } from '@/lib/animations'

interface Technology {
  name: string
  icon: string
}

interface RightSidebarProps {
  technologies: Technology[]
  activeFilter?: string
  onFilterChange?: (filter: string) => void
}

const techIcons: Record<string, string> = {
  React: '⚛️',
  'Next.js': '▲',
  TypeScript: '𝚃𝚂',
  JavaScript: '𝙹𝚂',
  'Three.js': '🎲',
  'Framer Motion': '✨',
  'Tailwind CSS': '🎨',
  'Node.js': '🟢',
  PostgreSQL: '🐘',
  Firebase: '🔥',
  GraphQL: '📊',
  Python: '🐍',
  'React Native': '📱',
  Storybook: '📖',
  'D3.js': '📈',
  Stripe: '💳',
  WebSocket: '🔌',
  CSS: '🎨',
}

export default function RightSidebar({ technologies, activeFilter, onFilterChange }: RightSidebarProps) {
  const uniqueTechs = Array.from(new Map(technologies.map(t => [t.name, t])).values())

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={slideInRight}
      className="hidden lg:flex lg:w-32 lg:flex-col lg:fixed lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:gap-4 lg:p-4"
    >
      <motion.button
        onClick={() => onFilterChange?.('All')}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
          activeFilter === 'All' || !activeFilter
            ? 'bg-accent text-accent-foreground shadow-lg'
            : 'bg-muted/50 text-foreground hover:bg-muted'
        }`}
        whileHover={{ scale: 1.1 }}
        title="All Projects"
      >
        ◆
      </motion.button>

      {uniqueTechs.map((tech, index) => (
        <motion.button
          key={`tech-${String(tech.name)}`}
          onClick={() => onFilterChange?.(tech.name)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: (index + 1) * 0.05 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all ${
            activeFilter === tech.name
              ? 'bg-accent text-accent-foreground shadow-lg'
              : 'bg-muted/50 text-foreground hover:bg-muted'
          }`}
          whileHover={{ scale: 1.1 }}
          title={tech.name}
        >
          {techIcons[tech.name] || '◆'}
        </motion.button>
      ))}
    </motion.aside>
  )
}
