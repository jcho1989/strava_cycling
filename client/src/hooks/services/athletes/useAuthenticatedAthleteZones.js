import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import athletesApi from '../../../services/api/athletes';

function useAuthenticatedAthleteZones() {

  const config = useMemo(() => {
    return {
      apiCall: athletesApi.getLoggedInAthleteZones
  }
  }, []);

  return useBaseReadHook(config);
}
export default useAuthenticatedAthleteZones;