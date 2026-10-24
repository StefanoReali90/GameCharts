import { Leaderboard } from '../../components/leaderboard/index.js'
import { RetroTitle } from '../../components/retrotitle/index.js'
import './LeaderboardPage.css'

export default function LeaderboardPage() {
  return (
    <main className="leaderboard-page" aria-labelledby="leaderboard-page-title">
      <header className="panel-heading">
        <RetroTitle as="h2" variant="panel" title="LEADERBOARD" id="leaderboard-page-title" />
      </header>
      <Leaderboard />
    </main>
  )
}
