import {useMemo} from 'react';
import queryString from 'query-string';

import useBaseReadHook from '../../useBaseReadHook';
import activitiesApi from '../../../services/api/activities';

const activityCache = new Map();


function useActivityStreams(id) {
  const cachedResult = activityCache.has(id) ? activityCache.get(id) : null;

  const config = useMemo(() => {
    if (id && !cachedResult) {
      const streamTypes = [
        'time',
        'heartrate',
        'altitude',
        'cadence',
        'temp',
        'distance',
        'grade_smooth',
        'grade_adjusted_distance'
      ]
      
      const queryParams = {
        keys: streamTypes.join(',')
      };

      return {
        apiCall: activitiesApi.getActivityStreams,
        pathParams: {id},
        params: queryParams

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
export default useActivityStreams;
