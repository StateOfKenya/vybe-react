# Environment Configuration Guide

## Overview

This project uses environment-specific configuration to handle different API endpoints for development and production environments:

- **Development**: API endpoints point to `http://localhost:8000`
- **Production**: API endpoints point to `https://apiv1.vybe.africa`

## Environment Files

The project includes the following environment files:

- `.env.development` - Configuration for development environment
- `.env.production` - Configuration for production environment

## Environment Variables

| Variable            | Description               | Development Value       | Production Value          |
| ------------------- | ------------------------- | ----------------------- | ------------------------- |
| `VITE_API_BASE_URL` | Base URL for API requests | `http://localhost:8000` | `https://api.vybe.africa` |

## How It Works

1. Vite automatically loads the appropriate environment file based on the current build mode.
2. The configuration is accessed through the `config.ts` file which provides a centralized way to access environment variables.
3. The API client in `api.ts` uses this configuration to set the base URL for all requests.

## Local Development

When running the application in development mode:

```bash
npm run dev
```

The application will use the `.env.development` configuration and API requests will be directed to `http://localhost:8000`.

## Production Build

When building for production:

```bash
npm run build
```

The application will use the `.env.production` configuration and API requests will be directed to `https://apiv1.vybe.africa`.

## Custom Environment

If you need to use a different API endpoint for testing or staging, you can create a custom environment file (e.g., `.env.staging`) and specify it when running the application:

```bash
npm run dev -- --mode staging
```

Or for building:

```bash
npm run build -- --mode staging
```
