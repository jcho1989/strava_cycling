import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

function useActivity(id) {
  const config = useMemo(() => {
    if (id) {
      return {
        apiCall: activitiesApi.getActivityById,
        pathParams: {id}
      }
    }
  }, [id]);

  return useBaseReadHook(config);
}
export default useActivity;
