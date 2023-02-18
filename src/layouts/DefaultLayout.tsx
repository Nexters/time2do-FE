import { Outlet } from 'react-router-dom'

interface Props {}

export function DefaultLayout({}: Props) {
  return (
    <div className="font-pretendard">
      <main className="relative m-auto grid min-h-screen w-screen max-w-md grid-rows-header-footer overflow-x-hidden text-grey-300">
        <Outlet />
      </main>
    </div>
  )
}
