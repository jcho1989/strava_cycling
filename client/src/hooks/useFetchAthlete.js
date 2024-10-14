import { useEffect } from 'react';
import useAthleteStore from '../store/athleteStore';
import useAuthenticatedAthlete from './services/athletes/useAuthenticatedAthlete';
// import useAthleteStore from '../stores/athleteStore';
// import useAuthenticatedAthlete from '../hooks/useAuthenticatedAthlete';

const useFetchAthlete = () => {
  const { setAthleteData, setIsFetching, setError } = useAthleteStore();
  const { results, loading, error } = useAuthenticatedAthlete();

  useEffect(() => {
    if (!results && !loading) {
      setIsFetching(true);
    }

    if (results) {
      setAthleteData(results); // Set athlete data in Zustand store
      setIsFetching(false);
    }

    if (error) {
      setError(error); // Set error in Zustand store
      setIsFetching(false);
    }
  }, [results, loading, error, setAthleteData, setIsFetching, setError]);
};

export default useFetchAthlete;
