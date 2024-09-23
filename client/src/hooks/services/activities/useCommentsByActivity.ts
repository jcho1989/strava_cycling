import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

function useCommentsByActivity(id: number) {
  const config: any = useMemo(() => {
    if (id) {
      return {
        apiCall: activitiesApi.getCommentsByActivityId,
        pathParams: {id}
      }
    }
  }, [id]);

  return useBaseReadHook(config);
}
export default useCommentsByActivity;