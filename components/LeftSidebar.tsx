'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { Dictionary, Locale } from '@/dictionaries/get-dictionary'
import { slideInLeft } from '@/lib/animations'

import { LanguageToggle } from './LanguageToggle'
import { SimpleIcon } from './SimpleIcon'

interface LeftSidebarProps {
  dict: Dictionary
  lang: Locale
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/billalbertcode', icon: 'github' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/billalbertcode', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://twitter.com/BillalbertCode', icon: 'twitter' },
  { name: 'Instagram', href: 'https://www.instagram.com/billalbertcode/', icon: 'instagram' },
]

export default function LeftSidebar({ dict, lang }: LeftSidebarProps) {
  const navItems = [
    { label: dict.nav.home, href: '#home' },
    { label: dict.nav.projects, href: '#projects' },
    { label: dict.nav.experience, href: '#experience' },
    { label: dict.nav.education, href: '#education' },
    { label: dict.nav.contact, href: `mailto:${dict.email}` },
  ]

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={slideInLeft}
      className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:border-r lg:border-border lg:bg-background/50 lg:backdrop-blur-sm lg:p-8"
    >
      {/* Logo/Name */}
      <motion.div className="mb-12" whileHover={{ scale: 1.05 }}>
        <h1 className="text-xl font-bold text-foreground">{dict.sidebar.title}</h1>
        <p className="text-xs text-muted-foreground mt-1">{dict.sidebar.subtitle}</p>
      </motion.div>

      {/* Language Toggle */}
      <div className="mb-8">
        <LanguageToggle />
      </div>

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
              href={item.href.startsWith('mailto:') ? item.href : `/${lang}${item.href}`}
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
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{dict.common.connect}</p>
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
              <SimpleIcon name={link.icon} size={14} className="group-hover:text-accent transition-colors" />
              {link.name}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.aside>
  )
}
