import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('/api/leaderboard/')
      .then(setEntries)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <h1 className="h2 mb-4">Leaderboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id || entry.id || index}>
                <th scope="row">{index + 1}</th>
                <td>{entry.username || entry.userId || entry.name || '—'}</td>
                <td>{entry.points ?? entry.score ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!entries.length && !error && <p className="text-secondary">No records found.</p>}
    </>
  )
}

export default Leaderboard
