"use server";

import type { Customer, Metrics, CountryMetric, RegionMetric } from "./types";
import { Pool } from "pg";

export async function getCustomerById(id: string): Promise<Customer | null> {
  const customers = await getCustomersFromDB();
  return customers.find((customer) => customer.customer_id === id) || null;
}

export async function getCustomerMetrics(): Promise<Metrics> {
  const customers = await getCustomersFromDB();

  // Calculate country metrics
  const countryCounts: Record<string, number> = {};
  const regionCounts: Record<string, number> = {};

  customers.forEach((customer) => {
    // Count by country
    if (customer.country) {
      countryCounts[customer.country] =
        (countryCounts[customer.country] || 0) + 1;
    }

    // Count by region
    const region = customer.region || "Unspecified";
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });

  // Convert to array format for charts
  const customersByCountry: CountryMetric[] = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  const customersByRegion: RegionMetric[] = Object.entries(regionCounts)
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalCustomers: customers.length,
    countriesCount: Object.keys(countryCounts).length,
    regionsCount: Object.keys(regionCounts).length,
    customersByCountry,
    customersByRegion,
  };
}

// New function to get customers directly from PostgreSQL database
export async function getCustomersFromDB(): Promise<Customer[]> {
  // Create a connection pool using the connection string
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // Execute the query
    const result = await pool.query("SELECT * FROM customers");

    // Map the database results to the Customer type
    return result.rows.map((row) => ({
      customer_id: row.customer_id,
      company_name: row.company_name,
      contact_name: row.contact_name,
      contact_title: row.contact_title,
      address: row.address,
      city: row.city,
      region: row.region,
      postal_code: row.postal_code,
      country: row.country,
      phone: row.phone,
      fax: row.fax,
    }));
  } catch (error) {
    console.error("Error fetching customers from database:", error);
    throw error;
  } finally {
    // Release the pool resources
    await pool.end();
  }
}
