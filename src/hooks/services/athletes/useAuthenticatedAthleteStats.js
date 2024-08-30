import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import athletesApi from '../../../services/api/athletes';

function useAuthenticatedAthletStats() {

  const config = useMemo(() => {
    return {
      apiCall: athletesApi.getStats
  }
  }, []);

  return useBaseReadHook(config);
}
export default useAuthenticatedAthletStats;
