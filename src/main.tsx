import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// extension 에서 라우팅을 사용하려면 BrowserRouter 가 아닌 MemoryRouter 를 사용해야만 제대로 페이지가 뜸.
// 정확한 원인과 해결방법은 아직 모르지만 일단 MemoryRouter 로 했을 때 익스텐션에서 동작함을 확인

const WrapperRouter = ({ children }: { children: ReactNode }) => {
  if (window?.chrome?.storage) {
    return <MemoryRouter>{children}</MemoryRouter>
  }
  return <BrowserRouter>{children}</BrowserRouter>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WrapperRouter>
      <App />
    </WrapperRouter>
  </React.StrictMode>,
)
