import { Title, Table } from 'laspeziaui'
import LeaderboardPodium from './components/LeaderboardPodium.jsx'
import { useLeaderboardPage } from './hooks/useLeaderboardPage.jsx'
export default function LeaderboardPage(props) {
  const page = useLeaderboardPage(props)
  return <section aria-labelledby="leaderboard-page-title" className="leaderboard-page">
    <Title title={page.title} id="leaderboard-page-title" size="large" showDivider headingClassName="py-0" />
    <div className={page.gridClassName} style={page.gridStyle}><LeaderboardPodium {...page.podiumProps} /><Table {...page.tableProps} /></div>
  </section>
}
