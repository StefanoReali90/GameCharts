import { Leaderboard } from '../../components/leaderboard/index.js'
import PageFrame from '../../components/layout/PageFrame.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function LeaderboardPage({ entranceReady, entranceFinished, onEntranceComplete, data, previousPositions }) {
  const { t } = useI18n()
  return (
    <PageFrame title={t('leaderboard.title')} titleId="leaderboard-page-title" titleSize="lg" compact>
      <Leaderboard entranceReady={entranceReady} entranceFinished={entranceFinished} onEntranceComplete={onEntranceComplete} data={data} previousPositions={previousPositions} />
    </PageFrame>
  )
}
