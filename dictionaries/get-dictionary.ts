import 'server-only'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

// Inferimos el tipo del diccionario basándonos en el JSON de inglés
export type Dictionary = Awaited<ReturnType<typeof dictionaries['en']>>

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en()
}
