"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useDebouncedCallback } from "@/lib/hooks"

export function CustomerSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")

  // Debounce the search to avoid too many URL updates
  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("query", value)
    } else {
      params.delete("query")
    }

    router.push(`${pathname}?${params.toString()}`)
  }, 300)

  // Update the search when the input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    debouncedSearch(value)
  }

  // Sync the input with URL params on initial load and navigation
  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "")
  }, [searchParams])

  return (
    <div className="relative w-full sm:w-[300px]">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search customers..."
        className="pl-8 w-full"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  )
}

