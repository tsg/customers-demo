"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/types"
import { Building2, MapPin, Phone } from "lucide-react"

interface CustomerDetailDialogProps {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerDetailDialog({ customer, open, onOpenChange }: CustomerDetailDialogProps) {
  if (!customer) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{customer.company_name}</DialogTitle>
          <DialogDescription>Customer ID: {customer.customer_id}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Company Name</div>
                <div>{customer.company_name}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">Contact Name</div>
                <div>{customer.contact_name || "N/A"}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">Contact Title</div>
                <div>{customer.contact_title || "N/A"}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Address</div>
                <div>{customer.address || "N/A"}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">City</div>
                  <div>{customer.city || "N/A"}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground">Region</div>
                  <div>{customer.region || "N/A"}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Postal Code</div>
                  <div>{customer.postal_code || "N/A"}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground">Country</div>
                  <div>{customer.country || "N/A"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Phone</div>
                  <div>{customer.phone || "N/A"}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground">Fax</div>
                  <div>{customer.fax || "N/A"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

