import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';
import {ConfigType} from '../../../types/Hooks.types';

const activityCache = new Map<number, any>();

function useActivity(id: number) {
  const cachedResult = activityCache.has(id) ? activityCache.get(id) : null;

  // fix return type later
  const config: any = useMemo(() => {
    if (id && !cachedResult) {
      return {
        apiCall: activitiesApi.getActivityById,
        pathParams: {id},
      };
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
