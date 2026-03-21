'use client'

import { motion } from 'framer-motion'

import { Dictionary } from '@/dictionaries/get-dictionary'
import { fadeIn } from '@/lib/animations'

import { SimpleIcon } from './SimpleIcon'

interface FooterProps {
  dict: Dictionary['footer']
  common: Dictionary['common']
  title: Dictionary['title']
  email: Dictionary['email']
  name: Dictionary['name']
}

export default function Footer({ dict, common, title, email, name }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: dict.quickLinks || 'Home', href: '#home' },
    { label: dict.projects || 'Projects', href: '#projects' },
    { label: dict.experience || 'Experience', href: '#experience' },
    { label: dict.education || 'Education', href: '#education' },
    { label: dict.contact || 'Contact', href: `mailto:${email}` },
  ]

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/billalbertcode', icon: 'github' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/billalbertcode', icon: 'linkedin' },
  ]

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="py-12 lg:py-16 border-t border-border mt-16 lg:mt-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-12 text-center md:text-left">
        {/* Profile Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{title}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
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
          <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">{dict.quickLinksTitle || 'Quick Links'}</h4>
          <div className="flex flex-col items-center md:items-start gap-3 text-sm">
            {quickLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors w-fit"
                whileHover={{ x: 4 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Socials Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">{common.connect}</h4>
          <div className="flex flex-col items-center md:items-start gap-3 text-sm">
            <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group w-fit"
                  whileHover={{ x: 4 }}
                >
                  <SimpleIcon name={link.icon} size={18} className="group-hover:text-accent transition-colors" />
                  <span className="hidden md:inline">{link.name}</span>
                </motion.a>
              ))}
            </div>
            <motion.a
              href={`mailto:${email}`}
              className="text-muted-foreground hover:text-foreground transition-colors mt-2 font-medium w-fit border-b border-transparent hover:border-accent transition-all"
              whileHover={{ scale: 1.05 }}
            >
              {email}
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p>&copy; {currentYear} {name}. {dict.rights}</p>
      </motion.div>
    </motion.footer>
  )
}
