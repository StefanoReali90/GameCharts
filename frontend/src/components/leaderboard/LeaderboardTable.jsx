import PlayerAvatar from './PlayerAvatar.jsx'

export default function LeaderboardTable({ players }) {
  return (
    <div className="nes-table-responsive leaderboard-table-wrap">
      <table className="nes-table is-bordered is-dark is-centered leaderboard-table">
        <thead>
          <tr>
            <th scope="col">POS.</th>
            <th scope="col">GIOCATORE</th>
            <th scope="col">PUNTEGGIO</th>
            <th scope="col">ULTIMO RISULTATO</th>
          </tr>
        </thead>
        <tbody>
          {players.length ? players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 4}</td>
              <td className="leaderboard-player-cell">
                <PlayerAvatar player={player} />
                <span>{player.name}</span>
              </td>
              <td><span className="nes-badge"><span className="is-primary">{player.score.toLocaleString('it-IT')}</span></span></td>
              <td><time dateTime={player.date}>{new Date(`${player.date}T00:00:00`).toLocaleDateString('it-IT')}</time></td>
            </tr>
          )) : (
            <tr>
              <td className="leaderboard-empty" colSpan="4">Nessun giocatore dal 4° posto in poi</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
