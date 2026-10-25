import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import english from './en.json'

const localeFiles = import.meta.glob(['./*.json', '!./en.json'], { import: 'default' })
const loadedMessages = { en: english }
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
  return 'en'
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(loadLanguage)
  const [messages, setMessages] = useState(() => loadedMessages[language] ?? english)
  const savedLanguage = useRef(language)
  const t = useCallback((key, values = {}) => {
    const template = messages[key] ?? english[key] ?? key
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
      if (active) setLanguage('en')
    })
    return () => { active = false }
  }, [language])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'
    document.title = t('app.title')
  }, [language, t])

  const saveLanguage = () => {
    savedLanguage.current = language
    try { window.localStorage.setItem(storageKey, language) } catch { /* Stato valido per la sessione. */ }
  }
  const discardLanguage = () => setLanguage(savedLanguage.current)

  const value = useMemo(() => ({ language, setLanguage, t, locale, saveLanguage, discardLanguage }), [language, t, locale])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('I18nProvider is required')
  return context
}
