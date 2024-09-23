import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

function useZonesByActivity(id: number) {
  const config: any = useMemo(() => {
    if (id) {
      return {
        apiCall: activitiesApi.getZonesByActivityId,
        pathParams: {id}
      }
    }
  }, [id]);

  return useBaseReadHook(config);
}
export default useZonesByActivity;