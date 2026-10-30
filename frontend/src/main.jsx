import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { I18nProvider } from 'laspeziaui'
import 'laspeziaui/styles.css'

createRoot(document.getElementById('root')).render(
  <I18nProvider><App /></I18nProvider>,
)
