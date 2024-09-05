import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

function useActivities() {
  const config = useMemo(() => {
      return {
        apiCall: activitiesApi.getLoggedInAthleteActivities
    }
  }, []);

  return useBaseReadHook(config);
}
export default useActivities;