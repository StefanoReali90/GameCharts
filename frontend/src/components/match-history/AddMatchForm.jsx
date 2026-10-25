import { useRef, useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import NeonButton from '../ui/NeonButton.jsx'
import { NeonField, NeonInput } from '../ui/NeonField.jsx'
import { parseScoreInput } from '../../utils/scores.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function AddMatchForm({ players, onAddMatch }) {
  const { t } = useI18n()
  const [winnerIds, setWinnerIds] = useState([])
  const [scoreInput, setScoreInput] = useState('')
  const [message, setMessage] = useState('')
  const winnersMenuRef = useRef(null)
  const selectedNames = players.filter((player) => winnerIds.includes(player.id))
    .map((player) => `${player.name} ${player.surname}`).join(', ')

  const toggleWinner = (id) => setWinnerIds((current) => current.includes(id)
    ? current.filter((winnerId) => winnerId !== id)
    : [...current, id])

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      onAddMatch(winnerIds, parseScoreInput(scoreInput))
      setWinnerIds([])
      setScoreInput('')
      setMessage('history.saved')
      if (winnersMenuRef.current) winnersMenuRef.current.open = false
    } catch (error) {
      setMessage(error.code === 'INVALID_PLAYER' ? 'history.invalidPlayer' : 'history.invalidScores')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="neon-surface grid gap-3 rounded-2xl border border-cyber-purple/25 p-4 sm:p-5" aria-label={t('history.add')}>
      <div>
        <h3 className="m-0 text-sm font-semibold capitalize tracking-[0.14em] text-cyan-100">{t('history.add')}</h3>
        <p className="mb-0 mt-1 text-xs text-cyber-muted">{t('history.help')}</p>
      </div>
      <div className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)_auto]">
        <fieldset className="relative min-w-0">
          <legend className="mb-2 text-xs font-semibold capitalize tracking-[0.16em] text-cyan-100">{t('history.winner')}</legend>
          <details ref={winnersMenuRef} className="group relative">
            <summary className="flex h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-xl border border-cyber-purple/40 bg-cyber-bg/80 px-3 text-sm text-cyber-text outline-none hover:border-cyber-cyan/55 focus-visible:ring-2 focus-visible:ring-cyber-cyan/25 [&::-webkit-details-marker]:hidden">
              <span className="truncate">{selectedNames || t('history.selectPlayer')}</span>
              <ChevronDown size={16} className="shrink-0 text-cyber-muted transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="absolute left-0 top-full z-30 mt-2 max-h-56 w-full min-w-[220px] overflow-y-auto rounded-xl border border-cyber-cyan/40 bg-cyber-surface p-2 shadow-[0_16px_36px_rgb(0_0_0/0.5)]">
              {players.map((player) => (
                <label key={player.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-cyber-text hover:bg-cyber-cyan/10">
                  <input type="checkbox" checked={winnerIds.includes(player.id)} onChange={() => toggleWinner(player.id)} className="accent-cyan-400" />
                  <span>{player.name} {player.surname}</span>
                </label>
              ))}
            </div>
          </details>
        </fieldset>
        <NeonField label={t('history.scores')} htmlFor="match-scores">
          <NeonInput id="match-scores" type="text" required value={scoreInput} onChange={(event) => setScoreInput(event.target.value)} placeholder="10, -1, 0" />
        </NeonField>
        <NeonButton type="submit" variant="primary" className="h-11 whitespace-nowrap"><Plus size={16} aria-hidden="true" /> {t('history.saveMatch')}</NeonButton>
      </div>
      {message && <p role="status" className="m-0 text-xs text-cyan-100">{t(message)}</p>}
    </form>
  )
}
