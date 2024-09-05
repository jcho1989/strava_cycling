import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import athletesApi from '../../../services/api/athletes';

function useActivities() {
  const config = useMemo(() => {
      return {
        apiCall: athletesApi.getLoggedInAthleteActivities
    }
  }, []);

  return useBaseReadHook(config);
}
export default useActivities;