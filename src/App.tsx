import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { DefaultLayout } from './layouts/DefaultLayout'
import { CountDownDetails, CountDownNew, History, Home, Login, NotFound, Report } from './pages'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import CountDownHome from './pages/CountDownHome'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/countdown" element={<CountDownHome />} />
            <Route path="/countdown/new" element={<CountDownNew />} />
            <Route path="/countdown/:invitationCode" element={<CountDownDetails />} />
            <Route path="/report" element={<Report />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<History />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
