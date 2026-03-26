import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bill.caribito.com'
  const locales = ['en', 'es']
  
  const routes = ['', '/#projects', '/#experience', '/#education'].map((route) => {
    const alternates = locales.reduce((acc, locale) => {
      acc[locale] = `${baseUrl}/${locale}${route}`
      return acc
    }, {} as Record<string, string>)

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: alternates,
      },
    }))
  }).flat()

  return routes
}
