import { useEffect, useState } from 'react';
import activitiesApi from '../../../services/api/activities';

const activityCache = new Map();


// DO NOT USE YET. Commented out service integration to prevent getting locked out.
// Need to setup some handler to prevent that before working.
function useMultipleActivityPhotos(ids) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMultiplePhotos = async () => {
      setLoading(true);

      try {
        // Filter out cached results
        const nonCachedIds = ids.filter(id => !activityCache.has(id));

        // Fetch only non-cached IDs
        if (nonCachedIds.length > 0 && !loading) {
          // const responses = await Promise.all(
            // nonCachedIds.map(id => activitiesApi.getActivityPhotos({ pathParams: { id } }))
          // );

          // Cache the results
          // responses.forEach((response, idx) => {
          //   activityCache.set(nonCachedIds[idx], response.data);
          // });
        }

        // Combine cached and newly fetched results
        const combinedResults = ids.map(id => activityCache.get(id));
        setResults(combinedResults);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMultiplePhotos();
  }, [ids]);

  return { results, loading, error };
}

export default useMultipleActivityPhotos;
