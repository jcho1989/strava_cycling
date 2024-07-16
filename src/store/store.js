import {create} from 'zustand';

const useAppStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
  },
}));

export default useAppStore;