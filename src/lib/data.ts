import type { Customer, Metrics, CountryMetric, RegionMetric } from "./types"

// This would be replaced with actual database queries
// For example, using Prisma, Drizzle, or direct database access
export async function getCustomers(): Promise<Customer[]> {
  // Simulating a database call with sample data
  return [
    {
      customer_id: "ALFKI",
      company_name: "Alfreds Futterkiste",
      contact_name: "Maria Anders",
      contact_title: "Sales Representative",
      address: "Obere Str. 57",
      city: "Berlin",
      region: null,
      postal_code: "12209",
      country: "Germany",
      phone: "030-0074321",
      fax: "030-0076545",
    },
    {
      customer_id: "ANATR",
      company_name: "Ana Trujillo Emparedados y helados",
      contact_name: "Ana Trujillo",
      contact_title: "Owner",
      address: "Avda. de la Constitución 2222",
      city: "México D.F.",
      region: null,
      postal_code: "05021",
      country: "Mexico",
      phone: "(5) 555-4729",
      fax: "(5) 555-3745",
    },
    {
      customer_id: "ANTON",
      company_name: "Antonio Moreno Taquería",
      contact_name: "Antonio Moreno",
      contact_title: "Owner",
      address: "Mataderos 2312",
      city: "México D.F.",
      region: null,
      postal_code: "05023",
      country: "Mexico",
      phone: "(5) 555-3932",
      fax: null,
    },
    {
      customer_id: "AROUT",
      company_name: "Around the Horn",
      contact_name: "Thomas Hardy",
      contact_title: "Sales Representative",
      address: "120 Hanover Sq.",
      city: "London",
      region: null,
      postal_code: "WA1 1DP",
      country: "UK",
      phone: "(171) 555-7788",
      fax: "(171) 555-6750",
    },
    {
      customer_id: "BERGS",
      company_name: "Berglunds snabbköp",
      contact_name: "Christina Berglund",
      contact_title: "Order Administrator",
      address: "Berguvsvägen 8",
      city: "Luleå",
      region: null,
      postal_code: "S-958 22",
      country: "Sweden",
      phone: "0921-12 34 65",
      fax: "0921-12 34 67",
    },
    {
      customer_id: "BLAUS",
      company_name: "Blauer See Delikatessen",
      contact_name: "Hanna Moos",
      contact_title: "Sales Representative",
      address: "Forsterstr. 57",
      city: "Mannheim",
      region: null,
      postal_code: "68306",
      country: "Germany",
      phone: "0621-08460",
      fax: "0621-08924",
    },
    {
      customer_id: "BLONP",
      company_name: "Blondesddsl père et fils",
      contact_name: "Frédérique Citeaux",
      contact_title: "Marketing Manager",
      address: "24, place Kléber",
      city: "Strasbourg",
      region: null,
      postal_code: "67000",
      country: "France",
      phone: "88.60.15.31",
      fax: "88.60.15.32",
    },
    {
      customer_id: "BOLID",
      company_name: "Bólido Comidas preparadas",
      contact_name: "Martín Sommer",
      contact_title: "Owner",
      address: "C/ Araquil, 67",
      city: "Madrid",
      region: null,
      postal_code: "28023",
      country: "Spain",
      phone: "(91) 555 22 82",
      fax: "(91) 555 91 99",
    },
    {
      customer_id: "BONAP",
      company_name: "Bon app'",
      contact_name: "Laurence Lebihan",
      contact_title: "Owner",
      address: "12, rue des Bouchers",
      city: "Marseille",
      region: null,
      postal_code: "13008",
      country: "France",
      phone: "91.24.45.40",
      fax: "91.24.45.41",
    },
    {
      customer_id: "BOTTM",
      company_name: "Bottom-Dollar Markets",
      contact_name: "Elizabeth Lincoln",
      contact_title: "Accounting Manager",
      address: "23 Tsawassen Blvd.",
      city: "Tsawassen",
      region: "BC",
      postal_code: "T2F 8M4",
      country: "Canada",
      phone: "(604) 555-4729",
      fax: "(604) 555-3745",
    },
  ]
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const customers = await getCustomers()
  return customers.find((customer) => customer.customer_id === id) || null
}

export async function getCustomerMetrics(): Promise<Metrics> {
  const customers = await getCustomers()

  // Calculate country metrics
  const countryCounts: Record<string, number> = {}
  const regionCounts: Record<string, number> = {}

  customers.forEach((customer) => {
    // Count by country
    if (customer.country) {
      countryCounts[customer.country] = (countryCounts[customer.country] || 0) + 1
    }

    // Count by region
    const region = customer.region || "Unspecified"
    regionCounts[region] = (regionCounts[region] || 0) + 1
  })

  // Convert to array format for charts
  const customersByCountry: CountryMetric[] = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)

  const customersByRegion: RegionMetric[] = Object.entries(regionCounts)
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count)

  return {
    totalCustomers: customers.length,
    countriesCount: Object.keys(countryCounts).length,
    regionsCount: Object.keys(regionCounts).length,
    customersByCountry,
    customersByRegion,
  }
}

