import { MatchHistory } from '../../components/match-history/index.js'
import { RetroTitle } from '../../components/retrotitle/index.js'
import './MatchHistoryPage.css'

export default function MatchHistoryPage() {
  return (
    <main className="match-history-page" aria-labelledby="match-history-page-title">
      <header className="panel-heading">
        <RetroTitle as="h2" variant="panel" title="STORICO MATCH" id="match-history-page-title" />
      </header>
      <MatchHistory />
    </main>
  )
}
