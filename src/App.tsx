import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { CountDownDetails, CountDownHome, CountDownNew, History, Home, Login, Profile } from './pages'

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
