import { MatchHistory } from '../../components/match-history/index.js'
import PageFrame from '../../components/layout/PageFrame.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function MatchHistoryPage({ data }) {
  const { t } = useI18n()
  return (
    <PageFrame title={t('history.title')} titleId="match-history-page-title" titleSize="md">
      <MatchHistory data={data} />
    </PageFrame>
  )
}
