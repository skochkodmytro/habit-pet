import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useUserStore } from '@/features/auth';

import { Habit } from '../types';
import { useHabitsStore } from '../store';

const TAKE = 10;

const habitCollection = firestore().collection('Habits');

const useHabitList = () => {
  const { user } = useUserStore();

  const {
    habits,
    isLoading,
    isFetchedAll,
    lastDocument,
    setLastDocument,
    setHabits,
    setIsFetchedAll,
    setIsLoading,
  } = useHabitsStore();

  useEffect(() => {
    fetchMoreHabits(true);
  }, []);

  const fetchMoreHabits = (isFirstRequest: boolean = false) => {
    if (!isFirstRequest && (isLoading || isFetchedAll)) return;

    setIsLoading(true);

    let query = habitCollection
      .orderBy('createdAt', 'desc')
      .where('userUid', '==', user?.uid)
      .where('isDeleted', '==', false);

    if (lastDocument) {
      query = query.startAfter(lastDocument);
    }

    query
      .limit(TAKE)
      .get()
      .then((querySnapshot) => {
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDocument(lastDoc);

        setHabits([
          ...habits,
          ...querySnapshot.docs.map(
            (doc) => ({ ...doc.data(), uid: doc.id }) as Habit
          ),
        ]);

        if (querySnapshot.docs.length < TAKE) setIsFetchedAll(true);
      })
      .finally(() => setIsLoading(false));
  };

  return { habits, isLoading, fetchMoreHabits };
};

export default useHabitList;
