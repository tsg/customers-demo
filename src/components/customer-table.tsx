"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CustomerDetailDialog } from "@/components/customer-detail-dialog";
import type { Customer } from "@/lib/types";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { deleteCustomerFromDB } from "@/lib/data";

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [customerList, setCustomerList] = useState<Customer[]>(customers);

  // Update local state when the customers prop changes
  useEffect(() => {
    setCustomerList(customers);
  }, [customers]);

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await deleteCustomerFromDB(customerId);
      // Update the local state by filtering out the deleted customer
      setCustomerList(customerList.filter((c) => c.customer_id !== customerId));
    } catch (error) {
      console.error("Failed to delete customer:", error);
      // Handle error (could add toast notification here)
    }
  };

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
            {customerList.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell className="font-medium">
                  {customer.customer_id}
                </TableCell>
                <TableCell>{customer.company_name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {customer.contact_name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {customer.country}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {customer.city}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {customer.phone}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCustomer(customer.customer_id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">Delete customer</span>
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
  );
}
