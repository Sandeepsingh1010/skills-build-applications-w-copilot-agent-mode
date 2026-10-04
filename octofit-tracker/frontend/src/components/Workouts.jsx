import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('/api/workouts/')
      .then(setWorkouts)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <h1 className="h2 mb-4">Workouts</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6 col-xl-4" key={workout._id || workout.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{workout.name || workout.title || 'Workout'}</h2>
                <p className="text-secondary mb-0">
                  {workout.description || workout.type || 'No description available.'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!workouts.length && !error && <p className="text-secondary">No records found.</p>}
    </>
  )
}

export default Workouts
