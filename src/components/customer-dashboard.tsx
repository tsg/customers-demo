"use client";

import { getCustomerMetrics, getCustomersFromDB } from "@/lib/data";
import { CustomerTable } from "@/components/customer-table";
import { CustomerSearch } from "@/components/customer-search";
import { CustomerFilter } from "@/components/customer-filter";
import { CustomerPagination } from "@/components/customer-pagination";
import { CustomerMetrics } from "@/components/customer-metrics";
import { CustomerCharts } from "@/components/customer-charts";
import { useEffect } from "react";
import { useState } from "react";
import { Customer, Metrics } from "@/lib/types";

export function CustomerDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const customersData = await getCustomersFromDB();
      const metricsData = await getCustomerMetrics();
      console.log(customersData);
      console.log(metricsData);
      setCustomers(customersData);
      setMetrics(metricsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Metrics and Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics && <CustomerMetrics metrics={metrics} />}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {metrics && <CustomerCharts metrics={metrics} />}
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
        {customers && <CustomerPagination totalCustomers={customers.length} />}
      </div>
    </div>
  );
}
