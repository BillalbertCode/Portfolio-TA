'use client'

import { motion } from 'framer-motion'
import { slideInLeft } from '@/lib/animations'
import Link from 'next/link'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: '↗' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: '↗' },
  { name: 'Twitter', href: 'https://twitter.com', icon: '↗' },
  { name: 'Dribbble', href: 'https://dribbble.com', icon: '↗' },
]

export default function LeftSidebar() {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={slideInLeft}
      className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:border-r lg:border-border lg:bg-background/50 lg:backdrop-blur-sm lg:p-8"
    >
      {/* Logo/Name */}
      <motion.div className="mb-12" whileHover={{ scale: 1.05 }}>
        <h1 className="text-xl font-bold text-foreground">CD</h1>
        <p className="text-xs text-muted-foreground mt-1">Creative Dev</p>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 mb-12">
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link
              href={item.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              {item.label}
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Social Links */}
      <div className="space-y-4 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Connect</p>
        <div className="flex flex-col gap-3">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              {link.name}
              <span className="text-accent">{link.icon}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.aside>
  )
}
