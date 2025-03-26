import { Suspense } from "react"
import { CustomerDashboard } from "@/components/customer-dashboard"
import { CustomerDashboardSkeleton } from "@/components/customer-dashboard-skeleton"

export default function CustomersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>
      <Suspense fallback={<CustomerDashboardSkeleton />}>
        <CustomerDashboard />
      </Suspense>
    </div>
  )
}

