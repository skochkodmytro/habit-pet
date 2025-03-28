import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useBoolean } from '@/hooks';
import { useUserStore } from '@/features/auth';

import { DaysEnum, Habit } from '../types';

const habitsCollection = firestore().collection('Habits');

const useWeekDateHabits = (days: DaysEnum[]) => {
  const { user } = useUserStore();

  const [habits, setHabits] = useState<Habit[]>([]);
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(true);

  useEffect(() => {
    fetchHabits();
  }, [days]);

  const fetchHabits = () => {
    startLoading();

    habitsCollection
      .orderBy('createdAt', 'desc')
      .where('userUid', '==', user?.uid)
      .where('repeatDays', 'array-contains-any', days)
      .where('isDeleted', '==', false)
      .get()
      .then((snapshot) => {
        const habitsData = snapshot.docs.map((doc) => ({
          ...(doc.data() as Habit),
          uid: doc.id,
        })) as Habit[];

        setHabits(habitsData);
      })
      .finally(finishLoading);
  };

  return { isLoading, habits, refetch: fetchHabits };
};

export default useWeekDateHabits;
