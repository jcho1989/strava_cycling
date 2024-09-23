import {useMemo} from 'react';

import useBaseReadHook from '../../useBaseReadHook';
import athletesApi from '../../../services/api/athletes';

function useAuthenticatedAthlete() {

  const config: any = useMemo(() => {
    return {
      apiCall: athletesApi.getLoggedInAthlete
  }
  }, []);

  return useBaseReadHook(config);
}
export default useAuthenticatedAthlete;
