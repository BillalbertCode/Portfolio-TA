import './globals.css'

import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The entity you are looking for has vanished or never existed.',
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased bg-background text-foreground overflow-hidden isolate`}>
        <main className="relative min-h-screen w-full flex items-center justify-center p-6">
          {/* Background Layer */}
          <div className="absolute inset-0 -z-10 select-none pointer-events-none">
            <Image
              src="/Backgrounds/ZANGETSU/IchigoInnerWorld.webp"
              alt="Inner World Background"
              fill
              priority
              className="object-cover opacity-20 grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background opacity-90" />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
            <h1 className="text-8xl md:text-[13rem] font-mono text-foreground mb-6 tracking-tighter drop-shadow-[0_0_50px_rgba(255,255,255,0.15)] select-none leading-none">
              404
            </h1>

            <div className="space-y-6 mb-16">
              <h2 className="text-xl md:text-2xl font-mono uppercase tracking-[0.4em] text-foreground/90">
                Resource Not Found
              </h2>
              <p className="text-muted-foreground font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] leading-relaxed border-y border-foreground/10 py-8 max-w-sm mx-auto">
                The path you followed has faded into the shadows of the spiritual world.
              </p>
            </div>

            {/* Action Link */}
            <Link 
              href="/"
              className="group relative inline-flex items-center justify-center px-16 py-5 bg-foreground text-background font-mono text-[10px] tracking-[0.5em] uppercase transition-all duration-500 hover:tracking-[0.7em] rounded-none shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Return Home</span>
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Technical Metadata Decoration */}
          <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-8 text-muted-foreground/20">
            <div className="w-24 h-px bg-current" />
            <span className="font-mono text-[9px] uppercase tracking-[0.6em]">Null_Pointer.Exited</span>
          </div>

          <div className="absolute top-12 right-12 hidden lg:flex items-center gap-8 text-muted-foreground/20 rotate-180">
            <div className="w-24 h-px bg-current" />
            <span className="font-mono text-[9px] uppercase tracking-[0.6em]">Memory.Leak_Detected</span>
          </div>
        </main>
      </body>
    </html>
  )
}
