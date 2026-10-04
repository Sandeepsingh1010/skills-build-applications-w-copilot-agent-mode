import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('/api/teams/')
      .then(setTeams)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <h1 className="h2 mb-4">Teams</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6 col-xl-4" key={team._id || team.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{team.name || 'Unnamed team'}</h2>
                <p className="text-secondary mb-0">
                  {team.description || 'No description available.'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!teams.length && !error && <p className="text-secondary">No records found.</p>}
    </>
  )
}

export default Teams
