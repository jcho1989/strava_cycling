import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import athletesApi from '../../../services/api/athletes';

export default function useAuthenticatedAthleteActivities() {
  const config: any = useMemo(() => {
      return {
        apiCall: athletesApi.getLoggedInAthleteActivities
    }
  }, []);

  return useBaseReadHook(config);
}
