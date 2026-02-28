'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent-foreground">CD</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Creative Developer</h3>
            <p className="text-sm text-muted-foreground mt-1">Full-Stack Designer & Developer</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Transforming ideas into elegant digital solutions through design, development, and creative problem-solving.
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
          <h4 className="font-semibold text-foreground text-sm">Quick Links</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: 'Home', href: '#home' },
              { label: 'Projects', href: '#projects' },
              { label: 'Experience', href: '#experience' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
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
        <p>&copy; {currentYear} Creative Developer. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
        </div>
      </motion.div>
    </motion.footer>
  )
}
