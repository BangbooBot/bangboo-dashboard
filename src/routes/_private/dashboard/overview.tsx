import { DashboardSidebar } from '#/components/DashboardSidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/dashboard/overview')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <main className="min-h-[calc(100vh-81px)] flex flex-col pb-20 pt-10 px-8 max-w-5xl mx-auto gap-y-4">
        
      </main>
    </>
  )
}
