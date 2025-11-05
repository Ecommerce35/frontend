// import create  from 'zustand';
import { create } from 'zustand';

// Define the Zustand store
const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  error: null,

  setUser: (user) =>
    set(() => ({
      user,
      loading: false,
      error: null,
    })),

  setError: (error) =>
    set(() => ({
      error,
      loading: false,
    })),

  setLoading: (loading) =>
    set(() => ({
      loading,
    })),

  resetUser: () =>
    set(() => ({
      user: null,
      loading: false,
      error: null,
    })),

  // ✅ change this:
  get isLoggedIn() {
    return get().user !== null;
  },
}));


export { useAuthStore };


