export interface Customer {
  customer_id: string
  company_name: string
  contact_name: string | null
  contact_title: string | null
  address: string | null
  city: string | null
  region: string | null
  postal_code: string | null
  country: string | null
  phone: string | null
  fax: string | null
}

export interface CountryMetric {
  country: string
  count: number
}

export interface RegionMetric {
  region: string
  count: number
}

export interface Metrics {
  totalCustomers: number
  countriesCount: number
  regionsCount: number
  customersByCountry: CountryMetric[]
  customersByRegion: RegionMetric[]
}

