import { create } from 'zustand';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface UserStore {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
