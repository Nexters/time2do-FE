import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// extension 에서 라우팅을 사용하려면 BrowserRouter 가 아닌 MemoryRouter 를 사용해야만 제대로 페이지가 뜸.
// 정확한 원인과 해결방법은 아직 모르지만 일단 MemoryRouter 로 했을 때 익스텐션에서 동작함을 확인

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
})

const WrapperRouter = ({ children }: { children: ReactNode }) => {
  if (window?.chrome?.storage) {
    return <MemoryRouter>{children}</MemoryRouter>
  }
  return <BrowserRouter>{children}</BrowserRouter>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <WrapperRouter>
        <ToastContainer position="top-center" autoClose={2000} pauseOnFocusLoss={false} limit={3} />
        <App />
      </WrapperRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
