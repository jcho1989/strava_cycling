import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

function useKudoersByActivity(id) {
  const config = useMemo(() => {
    if (id) {
      return {
        apiCall: activitiesApi.getKudoersByActivityId,
        pathParams: {id}
      }
    }
  }, [id]);

  return useBaseReadHook(config);
}
export default useKudoersByActivity;