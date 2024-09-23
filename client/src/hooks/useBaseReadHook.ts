import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

import { ConfigType, ApiResponse} from '../types/Hooks.types';

function useBaseReadHook(config: ConfigType | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<any>(undefined);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const refresh = useCallback(() => {
    if (config) {
      const { apiCall, pathParams, params, data, onSuccess, onError } = config;

      abortController?.abort();
      setLoading(true);

      const _abortController = new AbortController();
      setAbortController(_abortController);

      const configData = {
        signal: _abortController.signal,
        pathParams,
        params,
        data,
      };

      apiCall(configData)
        .then((response: {data: ApiResponse}) => {
          setResults(response?.data);
          setError(undefined);
          setLoading(false);
          onSuccess?.();
        })
        .catch((err: any) => {
          if (err?.message === 'canceled') {
            return;
          }
          console.error(err);
          setError(err);
          setResults(null);
          setLoading(false);
          onError?.(err);
        });
    } else {
      setResults(null);
      setError(undefined);
    }
  }, [config, abortController]);

  useEffect(() => {
    console.log('refreshing')
    // refresh();
  }, [refresh]);

  return {
    loading,
    results,
    error,
    sync: useCallback(() => setTimeout(() => refresh(), 100), [refresh]),
  };
}

export default useBaseReadHook;
