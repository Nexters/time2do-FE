import { Outlet } from 'react-router-dom'

interface Props {}

export function DefaultLayout({}: Props) {
  return (
    <div className="bg-gradient-to-br from-green-200 to-blue-400 text-[#191f28]">
      <main className="bg-white grid min-h-screen grid-rows-header-footer relative w-screen max-w-md m-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}
