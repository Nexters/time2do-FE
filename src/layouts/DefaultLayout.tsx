import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <main className="relative m-auto grid min-h-screen w-full grid-rows-header-footer overflow-x-hidden font-pretendard text-grey-300 sm:max-w-md">
      <Outlet />
    </main>
  )
}
