import AppFooter from '#/components/AppFooter'
import { DashboardNavbar } from '#/components/DashboardNavbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/_guild')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <DashboardNavbar />
    <Outlet />
    <AppFooter />
    </>
  )
}
