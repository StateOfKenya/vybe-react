/**
 * Utility functions for handling API errors consistently across the application
 */

import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message: string;
  details?: string;
  code?: string;
}

/**
 * Extracts a user-friendly error message from an API error
 * @param error The error object from the API call
 * @returns A user-friendly error message
 */
export const getErrorMessage = (error: unknown): string => {
  // Handle Axios errors
  if (error instanceof AxiosError) {
    // Check if the error has a response with data
    if (error.response?.data) {
      const errorData = error.response.data as ApiErrorResponse;
      
      // Return the error message from the API if available
      if (errorData.message) {
        return errorData.message;
      }
      
      // If there are error details, return those
      if (errorData.details) {
        return errorData.details;
      }
    }
    
    // If there's a message in the error object, return that
    if (error.message) {
      // Don't expose network error details to the user
      if (error.message === 'Network Error') {
        return 'Unable to connect to the server. Please check your internet connection.';
      }
      return error.message;
    }
  }
  
  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }
  
  // Fallback for unknown error types
  return 'An unexpected error occurred. Please try again later.';
};

/**
 * Logs API errors to the console with additional context
 * @param error The error object
 * @param context Additional context about where the error occurred
 */
export const logApiError = (error: unknown, context: string): void => {
  console.error(`API Error in ${context}:`, error);
  
  // Additional logging for Axios errors
  if (error instanceof AxiosError) {
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('Request was made but no response was received:', error.request);
    }
  }
};