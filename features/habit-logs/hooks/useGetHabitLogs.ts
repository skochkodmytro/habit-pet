import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import dayjs, { Dayjs } from 'dayjs';

import { useBoolean } from '@/hooks';

import { HabitLog } from '../types';

const habitsLogsCollection = firestore().collection('HabitsLogs');

const useGetHabitLogs = (date: Dayjs) => {
  const [habitsLogs, setHabitsLogs] = useState<HabitLog[]>([]);
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean();

  useEffect(() => {
    fetchLogs();
  }, [date]);

  const fetchLogs = async () => {
    startLoading();

    const startOfDay = dayjs(date).startOf('day').toDate();
    const startTimestamp = firestore.Timestamp.fromDate(startOfDay);

    return habitsLogsCollection
      .where('createdAt', '>=', startTimestamp)
      .get()
      .then((snapshot) => {
        setHabitsLogs(
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), uid: doc.id }) as HabitLog
          )
        );
      })
      .finally(finishLoading);
  };

  const addHabitLog = (habitLog: HabitLog) => {
    setHabitsLogs((prev) => [...prev, habitLog]);
  };

  const removeHabitLog = (uid: string) => {
    setHabitsLogs(habitsLogs.filter((log) => log.uid !== uid));
  };

  return {
    isLoading,
    habitsLogs,
    addHabitLog,
    removeHabitLog,
    refetch: fetchLogs,
  };
};

export default useGetHabitLogs;
