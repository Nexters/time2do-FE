import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { CountDownDetails } from './pages/CountDownDetails'
import { CountDownHome } from './pages/CountDownHome'
import { CountDownNew } from './pages/CountDownNew'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/countdown" element={<CountDownHome />} />
        <Route path="/countdown/new" element={<CountDownNew />} />
        <Route path="/countdown/:id" element={<CountDownDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}

export default App
