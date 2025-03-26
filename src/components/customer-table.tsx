"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CustomerDetailDialog } from "@/components/customer-detail-dialog"
import type { Customer } from "@/lib/types"
import { EyeIcon } from "lucide-react"

interface CustomerTableProps {
  customers: Customer[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden md:table-cell">Country</TableHead>
              <TableHead className="hidden lg:table-cell">City</TableHead>
              <TableHead className="hidden lg:table-cell">Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell className="font-medium">{customer.customer_id}</TableCell>
                <TableCell>{customer.company_name}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.contact_name}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.country}</TableCell>
                <TableCell className="hidden lg:table-cell">{customer.city}</TableCell>
                <TableCell className="hidden lg:table-cell">{customer.phone}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(customer)}>
                    <EyeIcon className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomerDetailDialog
        customer={selectedCustomer}
        open={!!selectedCustomer}
        onOpenChange={(open) => !open && setSelectedCustomer(null)}
      />
    </>
  )
}

