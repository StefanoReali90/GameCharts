import { Title, Table } from 'laspeziaui'
import { useMatchHistoryPage } from './hooks/useMatchHistoryPage.jsx'
export default function MatchHistoryPage(props) {
  const page = useMatchHistoryPage(props)
  return <section aria-labelledby="match-history-page-title" className="match-history-page">
    <Title title={page.title} id="match-history-page-title" size="medium" showDivider headingClassName="py-1" />
    <Table {...page.tableProps} />
  </section>
}
