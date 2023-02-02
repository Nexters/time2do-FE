import { Outlet } from 'react-router-dom'

interface Props {}

export function DefaultLayout({}: Props) {
  return (
    <div className="bg-grey-900">
      <main className="relative m-auto grid min-h-screen w-screen max-w-md grid-rows-header-footer overflow-x-hidden text-grey-400">
        <Outlet />
      </main>
    </div>
  )
}
