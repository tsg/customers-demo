"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CustomerFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCountry = searchParams.get("country") || ""

  const handleCountryChange = (country: string) => {
    const params = new URLSearchParams(searchParams)

    if (country) {
      params.set("country", country)
    } else {
      params.delete("country")
    }

    router.push(`/customers?${params.toString()}`)
  }

  // This would ideally be fetched from the database
  const countries = ["USA", "UK", "Germany", "France", "Spain", "Italy", "Canada", "Brazil", "Mexico", "Japan"]

  return (
    <Select value={currentCountry} onValueChange={handleCountryChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Filter by country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Countries</SelectItem>
        {countries.map((country) => (
          <SelectItem key={country} value={country}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

