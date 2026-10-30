import { trendStyles } from './config'
import Icon from '../Icon/Icon.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
export default function PositionTrend({ change, label, t: translate }) {
  const { t } = useI18n()
  if (!change) return null
  const rising = change > 0
  return <span className={`leaderboard-position-trend inline-flex items-center gap-0.5 rounded-md px-1 py-0.5 text-[11px] font-bold ${rising ? trendStyles.rising : trendStyles.falling}`} role="img" aria-label={label ?? (translate ?? t)(rising ? 'leaderboard.risen' : 'leaderboard.fallen', { count: Math.abs(change) })}>
    <Icon name={rising ? 'ArrowUp' : 'ArrowDown'} size={12} strokeWidth={3} aria-hidden="true" /><span aria-hidden="true">{Math.abs(change)}</span>
  </span>
}
