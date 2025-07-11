/**
 * Utility functions for API requests and caching
 */

import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface ApiOptions {
  cacheKey?: string;
  cacheDuration?: number; // in milliseconds
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

const CACHE: Record<string, { data: any; timestamp: number }> = {};

/**
 * Clears the entire API cache
 */
export const clearApiCache = (): void => {
  Object.keys(CACHE).forEach(key => delete CACHE[key]);
};

/**
 * Clears a specific cache entry
 * @param key The cache key to clear
 */
export const clearCacheItem = (key: string): void => {
  delete CACHE[key];
};

/**
 * Hook for making API requests with loading, error, and caching support
 * @param apiCall The API function to call
 * @param options Optional configuration
 * @returns State object with data, loading, and error
 */
export function useApiRequest<T>(
  apiCall: () => Promise<T>,
  options: ApiOptions = {}
): ApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const { cacheKey, cacheDuration = 5 * 60 * 1000, onSuccess, onError } = options;

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    // Check cache if a cache key is provided
    if (cacheKey && CACHE[cacheKey]) {
      const cachedData = CACHE[cacheKey];
      const isCacheValid = Date.now() - cachedData.timestamp < cacheDuration;

      if (isCacheValid) {
        setState({
          data: cachedData.data,
          loading: false,
          error: null,
        });
        if (onSuccess) onSuccess(cachedData.data);
        return;
      }
    }

    try {
      const result = await apiCall();
      
      // Update cache if a cache key is provided
      if (cacheKey) {
        CACHE[cacheKey] = {
          data: result,
          timestamp: Date.now(),
        };
      }

      setState({
        data: result,
        loading: false,
        error: null,
      });

      if (onSuccess) onSuccess(result);
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });

      if (onError) onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, [apiCall, cacheKey, cacheDuration, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}