import {useMemo} from 'react';

import useBaseReadHook from './useBaseReadHook';
import athletesApi from '../services/api/athletes';

function useAuthenticatedAthlete() {

  const config = useMemo(() => {
    return {
      apiCall: athletesApi.getAuthenticatedAthlete
  }
  }, []);

  return useBaseReadHook(config);
}
export default useAuthenticatedAthlete;
