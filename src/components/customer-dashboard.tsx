import { getCustomers, getCustomerMetrics } from "@/lib/data"
import { CustomerTable } from "@/components/customer-table"
import { CustomerSearch } from "@/components/customer-search"
import { CustomerFilter } from "@/components/customer-filter"
import { CustomerPagination } from "@/components/customer-pagination"
import { CustomerMetrics } from "@/components/customer-metrics"
import { CustomerCharts } from "@/components/customer-charts"

export async function CustomerDashboard() {
  const customers = await getCustomers()
  const metrics = await getCustomerMetrics()

  return (
    <div className="space-y-6">
      {/* Metrics and Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CustomerMetrics metrics={metrics} />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <CustomerCharts metrics={metrics} />
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <CustomerSearch />
        <CustomerFilter />
      </div>

      {/* Table Section */}
      <CustomerTable customers={customers} />

      {/* Pagination Section */}
      <div className="flex justify-end">
        <CustomerPagination totalCustomers={customers.length} />
      </div>
    </div>
  )
}

