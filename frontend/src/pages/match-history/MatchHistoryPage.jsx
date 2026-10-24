import { MatchHistory } from '../../components/match-history/index.js'
import PageFrame from '../../components/layout/PageFrame.jsx'

export default function MatchHistoryPage() {
  return (
    <PageFrame title="Storico Match" titleId="match-history-page-title">
      <MatchHistory />
    </PageFrame>
  )
}
