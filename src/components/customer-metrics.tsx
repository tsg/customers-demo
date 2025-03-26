import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metrics } from "@/lib/types"
import { Users, Globe, MapPin, Building } from "lucide-react"

interface CustomerMetricsProps {
  metrics: Metrics
}

export function CustomerMetrics({ metrics }: CustomerMetricsProps) {
  const metricCards = [
    {
      title: "Total Customers",
      value: metrics.totalCustomers,
      description: "Active customer accounts",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+12% from last month",
    },
    {
      title: "Countries",
      value: metrics.countriesCount,
      description: "Unique countries served",
      icon: <Globe className="h-4 w-4 text-muted-foreground" />,
      change: "+2 new countries",
    },
    {
      title: "Regions",
      value: metrics.regionsCount,
      description: "Geographical regions",
      icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
      change: "Across 3 continents",
    },
    {
      title: "Companies",
      value: metrics.totalCustomers,
      description: "Unique company accounts",
      icon: <Building className="h-4 w-4 text-muted-foreground" />,
      change: "+5 this week",
    },
  ]

  return (
    <>
      {metricCards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.change}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

