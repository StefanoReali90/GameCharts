import { useState } from 'react'
import { Plus } from 'lucide-react'
import NeonButton from '../ui/NeonButton.jsx'
import { NeonField, NeonInput, NeonSelect } from '../ui/NeonField.jsx'
import { parseScoreInput } from '../../utils/scores.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function AddMatchForm({ players, onAddMatch }) {
  const { t } = useI18n()
  const [winnerId, setWinnerId] = useState('')
  const [scoreInput, setScoreInput] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      onAddMatch(winnerId, parseScoreInput(scoreInput))
      setWinnerId('')
      setScoreInput('')
      setMessage('history.saved')
    } catch (error) {
      setMessage(error.code === 'INVALID_PLAYER' ? 'history.invalidPlayer' : 'history.invalidScores')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="neon-surface grid gap-3 rounded-2xl border border-cyber-purple/25 p-4 sm:p-5" aria-label={t('history.add')}>
      <div>
        <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100">{t('history.add')}</h3>
        <p className="mb-0 mt-1 text-xs text-cyber-muted">{t('history.help')}</p>
      </div>
      <div className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)_auto]">
        <NeonField label={t('history.winner')} htmlFor="match-winner">
          <NeonSelect id="match-winner" value={winnerId} onChange={(event) => setWinnerId(event.target.value)} required>
            <option value="">{t('history.selectPlayer')}</option>
            {players.map((player) => <option key={player.id} value={player.id}>{player.name} {player.surname}</option>)}
          </NeonSelect>
        </NeonField>
        <NeonField label={t('history.scores')} htmlFor="match-scores">
          <NeonInput id="match-scores" type="text" required value={scoreInput} onChange={(event) => setScoreInput(event.target.value)} placeholder="10, -1, 0" />
        </NeonField>
        <NeonButton type="submit" variant="primary" className="h-11 whitespace-nowrap"><Plus size={16} aria-hidden="true" /> {t('history.saveMatch')}</NeonButton>
      </div>
      {message && <p role="status" className="m-0 text-xs text-cyan-100">{t(message)}</p>}
    </form>
  )
}
