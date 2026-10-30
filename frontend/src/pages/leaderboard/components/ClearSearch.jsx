import { Button, Icon, Tooltip } from 'laspeziaui'
export default function ClearSearch({query,onClear,t}) {
  return query.trim() ? <Tooltip content={t('leaderboard.clearSearch')}><Button variant="ghost" motionEnabled={false} className="h-9 min-h-9 shrink-0 gap-1.5 px-2.5 capitalize text-cyan-100" aria-label={t('leaderboard.clearSearch')} onClick={onClear}><Icon name="SearchX" size={16} aria-hidden="true" /><span className="hidden sm:inline">{t('leaderboard.clearSearch')}</span></Button></Tooltip> : null
}
