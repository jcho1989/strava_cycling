import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

const activityCache = new Map();


function useActivity(id) {
  const cachedResult = activityCache.has(id) ? activityCache.get(id) : null;

  const config = useMemo(() => {
    if (id && !cachedResult) {
      return {
        apiCall: activitiesApi.getActivityById,
        pathParams: {id}
      }
    }
  }, [id, cachedResult]);

  const baseHookResult = useBaseReadHook(config);

  
  if (cachedResult) {
    return {
      ...baseHookResult,
      results: cachedResult,
      loading: false,
    };
  }

  if (baseHookResult.results && !activityCache.has(id)) {
    activityCache.set(id, baseHookResult.results);
  }

  return baseHookResult;

}
export default useActivity;
