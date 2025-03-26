# Sample Customers Dashboard

This is a Next.js application that provides a modern dashboard interface for the well-known Northwind database. The dashboard allows you to view customer data from the classic sample database used for demos and tutorials.

<img width="1634" alt="Screenshot 2025-03-26 at 12 03 19" src="https://github.com/user-attachments/assets/6a00cc8e-be52-4611-b51f-47142ad4a87c" />

## Getting Started

### Running Locally with pnpm:

1. Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

### Running with Docker Compose

1. Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

2. Export the `DATABASE_URL` environment variable.

3. Build and start the container:

```bash
docker-compose up -d
```

4. Open [http://localhost:3000](http://localhost:3000) to access the dashboard.
