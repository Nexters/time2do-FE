import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { DefaultLayout } from './layouts/DefaultLayout'
import { CountDownDetails, CountDownHome, CountDownNew, History, Home, Login, NotFound, Report } from './pages'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
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
            <Route path="/countdown/:id" element={<CountDownDetails />} />
            <Route path="/report" element={<Report />} />
            <Route path="/login" element={<Login />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
