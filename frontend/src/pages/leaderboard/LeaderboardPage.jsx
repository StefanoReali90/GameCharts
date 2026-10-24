import { Leaderboard } from '../../components/leaderboard/index.js'
import PageFrame from '../../components/layout/PageFrame.jsx'

export default function LeaderboardPage() {
  return (
    <PageFrame title="Leaderboard" titleId="leaderboard-page-title">
      <Leaderboard />
    </PageFrame>
  )
}
