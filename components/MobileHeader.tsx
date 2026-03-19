'use client'

import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Dictionary, Locale } from '@/dictionaries/get-dictionary'

import { LanguageToggle } from './LanguageToggle'
import { SimpleIcon } from './SimpleIcon'

interface MobileHeaderProps {
  dict: Dictionary
  lang: Locale
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/billalbertcode', icon: 'github' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/billalbertcode', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://twitter.com/BillalbertCode', icon: 'twitter' },
  { name: 'Instagram', href: 'https://www.instagram.com/billalbertcode/', icon: 'instagram' },
]

export default function MobileHeader({ dict, lang }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: dict.nav.home, href: '#home' },
    { label: dict.nav.projects, href: '#projects' },
    { label: dict.nav.experience, href: '#experience' },
    { label: dict.nav.education, href: '#education' },
    { label: dict.nav.contact, href: `mailto:${dict.email}` },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a mailto link, let it handle naturally
    if (href.startsWith('mailto:')) {
      setIsOpen(false)
      return
    }

    // If it's an internal anchor
    if (href.startsWith('#')) {
      e.preventDefault()
      const id = href.substring(1)
      const element = document.getElementById(id)
      
      setIsOpen(false)
      
      if (element) {
        // Longer delay to ensure Sheet has fully closed and body scroll is restored
        setTimeout(() => {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 350)
      }
    }
  }

  return (
    <header className="lg:hidden sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md px-4 h-16 flex items-center justify-between">
      <Link href={`/${lang}`} className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tighter text-foreground">
          {dict.sidebar.title}
        </span>
      </Link>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-lg border-l border-border/40 flex flex-col p-0">
          <SheetHeader className="p-6 border-b border-border/40 text-left">
            <SheetTitle className="text-xl font-bold">{dict.sidebar.title}</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto py-6 px-6">
            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href.startsWith('mailto:') ? item.href : `/${lang}${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors block w-full"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-12 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  {dict.common.connect}
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-accent/10 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <SimpleIcon name={link.icon} size={20} />
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border/40">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-4">
                  Language / Idioma
                </p>
                <LanguageToggle />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border/40 bg-accent/5">
            <p className="text-xs text-muted-foreground text-center italic">
              {dict.footer.rights}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
