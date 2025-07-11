/**
 * Custom hook for authentication-related API calls
 */

import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '@/api/auth';
import { useApiRequest } from '@/utils/apiUtils';
import { getErrorMessage } from '@/utils/apiErrorHandler';

export function useAuthApi() {
  const { login: contextLogin, register: contextRegister } = useAuth();

  // Enhanced login function with better error handling
  const login = useCallback(async (email: string, password: string) => {
    try {
      return await contextLogin(email, password);
    } catch (error) {
      // Transform error to a more user-friendly message
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }, [contextLogin]);

  // Enhanced register function with better error handling
  const register = useCallback(async (email: string, password: string) => {
    try {
      return await contextRegister(email, password);
    } catch (error) {
      // Transform error to a more user-friendly message
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }, [contextRegister]);

  // Hook to fetch current user with loading and error states
  const useCurrentUser = () => {
    return useApiRequest(
      () => getCurrentUser(),
      {
        cacheKey: 'currentUser',
        cacheDuration: 5 * 60 * 1000, // 5 minutes
      }
    );
  };

  return {
    login,
    register,
    useCurrentUser,
  };
}