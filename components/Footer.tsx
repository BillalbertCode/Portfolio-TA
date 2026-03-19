'use client'

import { motion } from 'framer-motion'

import { Dictionary } from '@/dictionaries/get-dictionary'
import { fadeIn } from '@/lib/animations'

interface FooterProps {
  dict: Dictionary['footer']
  title: Dictionary['title']
  email: Dictionary['email']
  name: Dictionary['name']
}

export default function Footer({ dict, title, email, name }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: dict.quickLinks || 'Home', href: '#home' },
    { label: dict.projects || 'Projects', href: '#projects' },
    { label: dict.experience || 'Experience', href: '#experience' },
    { label: dict.education || 'Education', href: '#education' },
    { label: dict.contact || 'Contact', href: `mailto:${email}` },
  ]

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="py-12 lg:py-16 border-t border-border mt-20 lg:mt-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Profile Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{title}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {dict.description}
          </p>
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-semibold text-foreground text-sm">{dict.quickLinksTitle || 'Quick Links'}</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {quickLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 4 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p>&copy; {currentYear} {name}. {dict.rights}</p>
      </motion.div>
    </motion.footer>
  )
}
