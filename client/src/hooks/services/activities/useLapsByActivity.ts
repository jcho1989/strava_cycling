import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

function useLapsByActivity(id: number) {
  const config: any = useMemo(() => {
    if (id) {
      return {
        apiCall: activitiesApi.getLapsByActivityId,
        pathParams: {id}
      }
    }
  }, [id]);

  return useBaseReadHook(config);
}
export default useLapsByActivity;