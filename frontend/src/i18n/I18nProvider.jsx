import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import english from './en.json'
import italian from './it.json'

const localeFiles = import.meta.glob(['./*.json', '!./en.json', '!./it.json'], { import: 'default' })
const loadedMessages = { en: english, it: italian }
const storageKey = 'gamechart-language-v2'

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

function loadLanguage() {
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (saved && languages.some((item) => item.code === saved)) return saved
  } catch {
    // La scelta resta modificabile anche senza localStorage.
  }
  return 'it'
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(loadLanguage)
  const [messages, setMessages] = useState(() => loadedMessages[language] ?? italian)
  const t = useCallback((key, values = {}) => {
    const template = messages[key] ?? italian[key] ?? english[key] ?? key
    return template.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''))
  }, [messages])
  const locale = language === 'zh' ? 'zh-CN' : language

  useEffect(() => {
    if (loadedMessages[language]) {
      setMessages(loadedMessages[language])
      return undefined
    }
    let active = true
    localeFiles[`./${language}.json`]?.().then((dictionary) => {
      loadedMessages[language] = dictionary
      if (active) setMessages(dictionary)
    }).catch(() => {
      if (active) setLanguage('it')
    })
    return () => { active = false }
  }, [language])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'
    document.title = t('app.title')
  }, [language, t])

  const preloadLanguage = useCallback((code) => {
    if (loadedMessages[code]) return Promise.resolve(loadedMessages[code])
    return localeFiles[`./${code}.json`]?.().then((dictionary) => {
      loadedMessages[code] = dictionary
      return dictionary
    }) ?? Promise.reject(new Error('Unsupported language'))
  }, [])

  const saveLanguage = (nextLanguage = language) => {
    const selected = languages.some((item) => item.code === nextLanguage) ? nextLanguage : 'it'
    if (loadedMessages[selected]) setMessages(loadedMessages[selected])
    setLanguage(selected)
    try { window.localStorage.setItem(storageKey, selected) } catch { /* Stato valido per la sessione. */ }
  }
  const value = useMemo(() => ({ language, t, locale, preloadLanguage, saveLanguage }), [language, t, locale, preloadLanguage])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('I18nProvider is required')
  return context
}
