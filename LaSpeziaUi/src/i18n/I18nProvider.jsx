import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import english from './en.json'
import italian from './it.json'

const localeFiles = import.meta.glob(['./*.json', '!./en.json', '!./it.json'], { import: 'default' })
const loadedMessages = { en: english, it: italian }
const storageKey = 'gamechart-language-v2'
const defaultFallbackLanguages = ['it', 'en']

export const languages = [
  { code: 'it', name: 'Italiano' },
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'fr', name: 'Français' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ur', name: 'اردو' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'mr', name: 'मराठी' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ha', name: 'Hausa' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ko', name: '한국어' },
  { code: 'ro', name: 'Română' },
]

function loadLanguage(storageKey, defaultLanguage, supportedLanguages) {
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (saved && supportedLanguages.some((item) => item.code === saved)) return saved
  } catch {
    // La scelta resta modificabile anche senza localStorage.
  }
  return defaultLanguage
}

const I18nContext = createContext(null)

export function I18nProvider({ children, defaultLanguage = 'it', fallbackLanguages = defaultFallbackLanguages, storageKey: persistenceKey = storageKey, languages: supportedLanguages = languages, dictionaries, loaders, documentTitleKey = 'app.title', manageDocument = true }) {
  const catalog = useMemo(() => ({ ...loadedMessages, ...dictionaries }), [dictionaries])
  const sources = loaders ?? localeFiles
  const [language, setLanguage] = useState(() => loadLanguage(persistenceKey, defaultLanguage, supportedLanguages))
  const [messages, setMessages] = useState(() => catalog[language] ?? catalog[defaultLanguage] ?? italian)
  const t = useCallback((key, values = {}) => {
    const template = messages[key] ?? fallbackLanguages.map((code) => catalog[code]?.[key]).find((value) => value != null) ?? key
    return template.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''))
  }, [messages, catalog, fallbackLanguages])
  const locale = language === 'zh' ? 'zh-CN' : language

  useEffect(() => {
    if (catalog[language]) {
      setMessages(catalog[language])
      return undefined
    }
    let active = true;
    (sources[language] ?? sources[`./${language}.json`])?.().then((dictionary) => {
      catalog[language] = dictionary
      if (!loaders) loadedMessages[language] = dictionary
      if (active) setMessages(dictionary)
    }).catch(() => {
      if (active) setLanguage(defaultLanguage)
    })
    return () => { active = false }
  }, [language, catalog, sources, defaultLanguage])

  useEffect(() => {
    if (!manageDocument) return
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'
    if (documentTitleKey) document.title = t(documentTitleKey)
  }, [language, t, manageDocument, documentTitleKey])

  const preloadLanguage = useCallback((code) => {
    if (catalog[code]) return Promise.resolve(catalog[code])
    return (sources[code] ?? sources[`./${code}.json`])?.().then((dictionary) => {
      catalog[code] = dictionary
      if (!loaders) loadedMessages[code] = dictionary
      return dictionary
    }) ?? Promise.reject(new Error('Unsupported language'))
  }, [catalog, sources])

  const saveLanguage = useCallback((nextLanguage = language) => {
    const selected = supportedLanguages.some((item) => item.code === nextLanguage) ? nextLanguage : defaultLanguage
    if (catalog[selected]) setMessages(catalog[selected])
    setLanguage(selected)
    try { window.localStorage.setItem(persistenceKey, selected) } catch { /* Stato valido per la sessione. */ }
  }, [language, supportedLanguages, defaultLanguage, catalog, persistenceKey])
  const value = useMemo(() => ({ language, t, locale, preloadLanguage, saveLanguage }), [language, t, locale, preloadLanguage, saveLanguage])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('I18nProvider is required')
  return context
}
