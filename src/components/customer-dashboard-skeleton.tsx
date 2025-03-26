import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CustomerDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Metrics Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-40 mb-1" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Skeleton className="h-10 w-full sm:w-[300px]" />
        <Skeleton className="h-10 w-full sm:w-[180px]" />
      </div>

      {/* Table Skeleton */}
      <div className="border rounded-md">
        <div className="h-12 px-4 border-b flex items-center bg-muted/50">
          <Skeleton className="h-4 w-full" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-16 px-4 border-b flex items-center">
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  )
}

