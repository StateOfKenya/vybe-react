# API Integration Guide

## Overview

This document provides information about the API integration in the Vybe React application. The application connects to different API endpoints based on the environment:

- **Development**: `http://localhost:8000`
- **Production**: `https://apiv1.vybe.africa`

## Authentication Endpoints

The application uses the following authentication endpoints:

### Login

```
POST /api/v1/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsI********************",
  "token_type": "bearer",
  "refresh_token": "eyJhbGciOiJIUzI1********************"
}
```

### Register

```
POST /api/v1/auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "id": "959b19f9-8e91-44b3-8d42-049a83f07244",
  "email": "user@example.com",
  "is_active": true
}
```

### Get Current User

```
GET /api/v1/auth/me
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsI**********************
```

**Response:**

```json
{
  "id": "959b19f9-8e91-44b3-8d42-049a83f07244",
  "email": "user@example.com",
  "is_active": true
}
```

## Implementation Details

### API Configuration

The API base URL is configured in `src/config.ts` and uses environment variables from `.env.development` and `.env.production` files.

### Authentication Flow

1. **Login**: When a user logs in, the application stores the access token and refresh token in localStorage.
2. **API Requests**: All API requests include the access token in the Authorization header.
3. **Token Refresh**: If an API request returns a 401 or 403 error, the application attempts to refresh the token using the refresh token.
4. **Logout**: When a user logs out, the tokens are removed from localStorage.

### Error Handling

The application includes a comprehensive error handling system:

- `apiErrorHandler.ts`: Provides utilities for extracting user-friendly error messages from API errors.
- `apiUtils.ts`: Includes hooks and utilities for making API requests with loading, error, and caching support.

## Utilities

### useAuthApi Hook

The `useAuthApi` hook provides enhanced authentication functions with better error handling and loading states:

```typescript
const { login, register, useCurrentUser } = useAuthApi();

// Get current user with loading and error states
const { data: userData, loading, error, refetch } = useCurrentUser();
```

## Best Practices

1. **Environment-Specific Configuration**: Use the appropriate environment variables for different environments.
2. **Error Handling**: Always handle API errors gracefully and provide user-friendly error messages.
3. **Loading States**: Show loading indicators when making API requests to improve user experience.
4. **Caching**: Use the caching mechanisms provided by `apiUtils.ts` to reduce unnecessary API requests.
5. **Token Management**: Securely store and manage authentication tokens.
