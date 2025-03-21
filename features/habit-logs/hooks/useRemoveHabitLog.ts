import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useBoolean } from '@/hooks';

const habitsLogsCollection = firestore().collection('HabitsLogs');

type UseRemoveHabitLog = {
  onSuccess?: (uid: string) => void;
};

const useRemoveHabitLog = ({ onSuccess }: UseRemoveHabitLog) => {
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(false);
  const [habitIdsProcessing, setHabitIdsProcessing] = useState<string[]>([]);

  const removeHabitLog = async (habitLogId: string) => {
    if (habitIdsProcessing.includes(habitLogId)) return;

    startLoading();
    setHabitIdsProcessing([...habitIdsProcessing, habitLogId]);

    return habitsLogsCollection
      .doc(habitLogId)
      .delete()
      .then(() => {
        if (onSuccess) onSuccess(habitLogId);
      })
      .finally(() => {
        setHabitIdsProcessing(
          habitIdsProcessing.filter((id) => id !== habitLogId)
        );
        finishLoading();
      });
  };

  return { isLoading, habitIdsProcessing, removeHabitLog };
};

export default useRemoveHabitLog;
