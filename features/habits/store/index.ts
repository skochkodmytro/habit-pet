import { create } from 'zustand';

import { Habit } from '../types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type Document =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

interface HabitsStore {
  habits: Habit[];
  isLoading: boolean;
  isFetchedAll: boolean;
  lastDocument: Document | null;

  setHabits: (habits: Habit[]) => void;
  setIsLoading: (value: boolean) => void;
  setIsFetchedAll: (value: boolean) => void;
  setLastDocument: (document: Document) => void;

  reset: () => void;
}

const initialStore = {
  habits: [],
  isLoading: true,
  isFetchedAll: false,
  lastDocument: null,
};

export const useHabitsStore = create<HabitsStore>((set) => ({
  ...initialStore,

  setHabits: (habits) => set({ habits }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setIsFetchedAll: (isFetchedAll) => set({ isFetchedAll }),

  setLastDocument: (lastDocument: Document) => set({ lastDocument }),

  reset: () => set(initialStore),
}));
