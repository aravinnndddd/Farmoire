// src/store/authStore.ts
import create from 'zustand';

interface AuthStore {
  user: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, isFarmer: boolean) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  signIn: async (email, password) => {
    // Here, you'd integrate your authentication logic (e.g., API call to log in)
    if (email === 'test@example.com' && password === 'password123') {
      set({ user: email, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  signUp: async (email, password, isFarmer) => {
    // Here, you'd integrate your sign-up logic (e.g., API call to register the user)
    set({ user: email, isAuthenticated: true });
  },
  signOut: () => set({ user: null, isAuthenticated: false }),
}));
