import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className="font-pretendard">
      <main className="relative m-auto grid min-h-screen w-screen max-w-[26.75rem] grid-rows-header-footer overflow-x-hidden text-grey-300">
        <Outlet />
      </main>
    </div>
  )
}
