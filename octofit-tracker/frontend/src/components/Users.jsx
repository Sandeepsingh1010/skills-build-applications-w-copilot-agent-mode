import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('/api/users/')
      .then(setUsers)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <h1 className="h2 mb-4">Users</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id || user.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{user.displayName || user.username || 'User'}</h2>
                <p className="text-secondary mb-0">{user.email || 'No email available.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!users.length && !error && <p className="text-secondary">No records found.</p>}
    </>
  )
}

export default Users
