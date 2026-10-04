import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('/api/activities/')
      .then(setActivities)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <ResourcePage title="Activities" error={error}>
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6 col-xl-4" key={activity._id || activity.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{activity.type || 'Activity'}</h2>
                <p className="mb-1">
                  <strong>{activity.durationMinutes || 0}</strong> minutes
                </p>
                <p className="text-secondary mb-0">
                  {activity.calories || 0} calories
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!activities.length && !error && <EmptyState />}
    </ResourcePage>
  )
}

function ResourcePage({ children, error, title }) {
  return (
    <>
      <h1 className="h2 mb-4">{title}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {children}
    </>
  )
}

function EmptyState() {
  return <p className="text-secondary">No records found.</p>
}

export default Activities
