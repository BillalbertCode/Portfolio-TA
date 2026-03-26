import '../globals.css'

import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono,Source_Serif_4 } from 'next/font/google'

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Billalbert Martinez',
    alternateName: 'BillalbertCode',
    url: 'https://bill.caribito.com',
    image: 'https://avatars.githubusercontent.com/u/156066236',
    sameAs: [
      'https://github.com/BillalbertCode',
      'https://linkedin.com/in/billalbertcode',
      'https://twitter.com/BillalbertCode',
      'https://www.instagram.com/billalbertcode/',
      'https://www.threads.net/@billalbertcode'
    ],
    jobTitle: 'Web Developer',
  }
  
  return (
    <html lang={lang} className="dark" data-scroll-behavior="smooth">
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} font-sans antialiased bg-background text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
