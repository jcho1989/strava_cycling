import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

function useCommentsByActivity() {
  const config = useMemo(() => {
      return {
        apiCall: activitiesApi.getLoggedInAthleteActivities
    }
  }, []);

  return useBaseReadHook(config);
}
export default useCommentsByActivity;