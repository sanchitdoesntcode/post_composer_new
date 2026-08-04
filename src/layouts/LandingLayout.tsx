import { Outlet } from 'react-router-dom'

export default function LandingLayout() {
  return (
    <div className="relative">
      <Outlet />
    </div>
  )
}
