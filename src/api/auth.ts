import api from "./api";
import { getErrorMessage, logApiError } from "../utils/apiErrorHandler";

// Description: Login user functionality
// Endpoint: POST /api/v1/auth/login
// Request: { email: string, password: string }
// Response: { access_token: string, token_type: string, refresh_token: string }
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/v1/auth/login", { email, password });
    // Transform the response to match our application's expected format
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token
    };
  } catch (error) {
    logApiError(error, "login");
    throw new Error(getErrorMessage(error));
  }
};

// Description: Register user functionality
// Endpoint: POST /api/v1/auth/register
// Request: { email: string, password: string }
// Response: { id: string, email: string, is_active: boolean }
export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/v1/auth/register", { email, password });
    return response.data;
  } catch (error) {
    logApiError(error, "register");
    throw new Error(getErrorMessage(error));
  }
};

// Description: Logout
// Endpoint: POST /api/v1/auth/logout
// Request: {}
// Response: { success: boolean, message: string }
export const logout = async () => {
  try {
    return await api.post("/api/v1/auth/logout");
  } catch (error) {
    logApiError(error, "logout");
    throw new Error(getErrorMessage(error));
  }
};

// Description: Get current user information
// Endpoint: GET /api/v1/auth/me
// Request: Authorization header with Bearer token
// Response: { id: string, email: string, is_active: boolean }
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/v1/auth/me");
    return response.data;
  } catch (error) {
    logApiError(error, "getCurrentUser");
    throw new Error(getErrorMessage(error));
  }
};
