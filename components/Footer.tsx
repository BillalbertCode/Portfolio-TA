'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import { useLanguage } from '@/context/language-context'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const quickLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.contact'), href: '#contact' },
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
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-accent to-accent/50 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent-foreground">BM</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{t('sidebar.title')}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t('sidebar.subtitle')}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('footer.description')}
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
          <h4 className="font-semibold text-foreground text-sm">{t('footer.quickLinks')}</h4>
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
        <p>&copy; {currentYear} {t('sidebar.title')}. {t('footer.rights')}</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-foreground transition-colors">
            {t('footer.privacy')}
          </a>
          <a href="#terms" className="hover:text-foreground transition-colors">
            {t('footer.terms')}
          </a>
        </div>
      </motion.div>
    </motion.footer>
  )
}
