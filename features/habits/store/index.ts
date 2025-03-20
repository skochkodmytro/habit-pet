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
}

export const useHabitsStore = create<HabitsStore>((set) => ({
  habits: [],
  setHabits: (habits) => set({ habits }),

  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),

  isFetchedAll: false,
  setIsFetchedAll: (isFetchedAll) => set({ isFetchedAll }),

  lastDocument: null,
  setLastDocument: (lastDocument: Document) => set({ lastDocument }),
}));
