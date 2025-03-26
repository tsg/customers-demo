# Docker Setup for Next.js Customer Dashboard

This document explains how to use the Docker setup for running the Next.js Customer Dashboard application.

## Prerequisites

- Docker and Docker Compose installed on your system
- A PostgreSQL database accessible via a connection string

## Getting Started

The application is configured to connect to a PostgreSQL database via the `DATABASE_URL` environment variable.

### Building and Running the Application

1. Build and start the container:

```bash
docker-compose up -d
```

2. View application logs:

```bash
docker-compose logs -f
```

3. Stop the application:

```bash
docker-compose down
```

## Configuration Options

### Environment Variables

The application uses the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string

You can provide these variables in two ways:

1. Through `.env.local` file (already configured)
2. By passing them directly when running docker-compose:

```bash
DATABASE_URL="postgresql://user:password@host:port/database" docker-compose up -d
```

### Development Mode

For development, you can uncomment the volumes section in `docker-compose.yml` to enable hot reloading:

```yaml
volumes:
  - ./src:/app/src
  - ./public:/app/public
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify your `DATABASE_URL` is correct
2. Ensure the database is running and accessible from the Docker container
3. Check the logs for specific errors:

```bash
docker-compose logs -f nextjs
```

### Build Failures

If the build process fails:

1. Check that your Next.js configuration is properly set up
2. Verify that all dependencies are correctly listed in package.json
3. Try rebuilding with the `--no-cache` flag:

```bash
docker-compose build --no-cache
``` 