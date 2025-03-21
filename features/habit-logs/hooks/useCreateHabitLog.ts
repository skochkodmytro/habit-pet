import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useUserStore } from '@/features/auth';
import { useBoolean } from '@/hooks';

import { HabitLog } from '../types';

const habitsLogsCollection = firestore().collection('HabitsLogs');

type UseCreateHabitLog = {
  onSuccess?: (log: HabitLog) => void;
};

const useCreateHabitLog = ({ onSuccess }: UseCreateHabitLog) => {
  const { user } = useUserStore();
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(false);
  const [habitIdsProcessing, setHabitIdsProcessing] = useState<string[]>([]);

  const createHabitLog = async (habitUid: string) => {
    if (habitIdsProcessing.includes(habitUid)) return;

    startLoading();
    setHabitIdsProcessing([...habitIdsProcessing, habitUid]);

    return habitsLogsCollection
      .add({
        habitUid,
        userUid: user?.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then((newDoc) => {
        return newDoc.get();
      })
      .then((docSnapshot) => {
        const createdLog = {
          ...docSnapshot.data(),
          uid: docSnapshot.id,
        } as HabitLog;

        if (onSuccess) onSuccess(createdLog);

        return {
          ...docSnapshot.data(),
          uid: docSnapshot.id,
        } as HabitLog;
      })
      .finally(() => {
        setHabitIdsProcessing(
          habitIdsProcessing.filter((id) => id !== habitUid)
        );
        finishLoading();
      });
  };

  return { isLoading, habitIdsProcessing, createHabitLog };
};

export default useCreateHabitLog;
