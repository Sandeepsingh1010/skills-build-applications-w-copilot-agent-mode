import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function Dashboard() {
  return (
    <div className="text-center py-5">
      <span className="display-6" role="img" aria-label="fitness">
        🏋️
      </span>
      <h1 className="display-5 fw-bold mt-3">OctoFit Tracker</h1>
      <p className="lead text-secondary">
        Track progress, compete with your team, and stay consistent.
      </p>
      <NavLink className="btn btn-primary mt-3" to="/activities">
        View activities
      </NavLink>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand fw-bold" to="/">
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main-navigation"
              aria-controls="main-navigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="main-navigation">
              <div className="navbar-nav ms-auto">
                {navigation.map(({ to, label }) => (
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link${isActive ? ' active' : ''}`
                    }
                    key={to}
                    to={to}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <Routes>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Activities />} path="/activities" />
            <Route element={<Leaderboard />} path="/leaderboard" />
            <Route element={<Teams />} path="/teams" />
            <Route element={<Users />} path="/users" />
            <Route element={<Workouts />} path="/workouts" />
            <Route element={<Dashboard />} path="*" />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
