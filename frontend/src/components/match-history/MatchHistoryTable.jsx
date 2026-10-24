export default function MatchHistoryTable({ matches }) {
  return (
    <div className="nes-table-responsive history-table-wrap">
      <table className="nes-table is-bordered is-dark is-centered history-table">
        <thead>
          <tr>
            <th scope="col">DATA</th>
            <th scope="col">GIOCO</th>
            <th scope="col">REGISTRATA DA</th>
            <th scope="col">VINCITORI</th>
            <th scope="col">PUNTEGGIO</th>
          </tr>
        </thead>
        <tbody>
          {matches.length ? matches.map((match) => (
            <tr key={match.id}>
              <td><time dateTime={match.date}>{new Date(`${match.date}T00:00:00`).toLocaleDateString('it-IT')}</time></td>
              <td>{match.gameName}</td>
              <td>{match.callerName}</td>
              <td>{match.winnerNames.join(', ')}</td>
              <td>{match.scores.map((score) => `${score.playerName}: ${score.score}`).join(' · ') || '—'}</td>
            </tr>
          )) : (
            <tr>
              <td className="history-empty" colSpan="5">Nessun match trovato con questi filtri</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
