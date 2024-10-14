import { create } from 'zustand';
import athletesApi from '../services/api/athletes';

const useAthleteStore = create((set, get) => ({
  athlete: null, // Initial state as null
  loading: false,
  error: null,
  
  fetchAthlete: async () => {
    const { athlete } = get();
    
    // Only fetch if athlete data isn't already in the store
    if (!athlete) {
      set({ loading: true, error: null });

      try {
        const response = await athletesApi.getLoggedInAthlete();
        set({ athlete: response.data, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    }
  },
  
  reset: () => {
    set({ athlete: null });
  }
}));

export default useAthleteStore;
