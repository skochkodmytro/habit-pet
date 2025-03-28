import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import firestore from '@react-native-firebase/firestore';

import { HabitWithLog } from '@/features/dashboard';
import { DaysEnum, Habit } from '@/features/habits';
import { HabitLog } from '@/features/habit-logs';
import { firestoreToDayjs } from '@/utils/date';
import { useBoolean } from '@/hooks';

import { DayStatistics } from '../types';

const habitsCollection = firestore().collection('Habits');
const habitsLogsCollection = firestore().collection('HabitsLogs');

const useStatisticList = () => {
  const [daysStatistics, setDaysStatistics] = useState<DayStatistics[]>([]);
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(false);

  const generateDateArray = (lastDate?: Dayjs): Dayjs[] => {
    const startDate = lastDate ? lastDate.subtract(1, 'day') : dayjs();
    return Array.from({ length: 10 }, (_, i) => startDate.subtract(i, 'day'));
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    if (isLoading) return;

    startLoading();

    const lastSavedDate = daysStatistics[daysStatistics.length - 1]?.day;
    const dates = generateDateArray(lastSavedDate);

    const firstDate = dates[0].toDate();
    const lastDate = dates[dates.length - 1].toDate();

    const notDeletedSnapshot = await habitsCollection
      .where('createdAt', '<=', firestore.Timestamp.fromDate(firstDate))
      .where('isDeleted', '==', false)
      .get();

    const recentlyDeletedSnapshot = await habitsCollection
      .where('createdAt', '<=', firestore.Timestamp.fromDate(firstDate))
      .where('deletedAt', '>=', firestore.Timestamp.fromDate(lastDate))
      .get();

    const habits = [
      ...notDeletedSnapshot.docs.map(
        (doc) => ({ ...doc.data(), uid: doc.id }) as Habit
      ),
      ...recentlyDeletedSnapshot.docs.map(
        (doc) => ({ ...doc.data(), uid: doc.id }) as Habit
      ),
    ];

    const habitsLogs = await habitsLogsCollection
      .where('createdAt', '<=', firestore.Timestamp.fromDate(firstDate))
      .where('createdAt', '>=', firestore.Timestamp.fromDate(lastDate))
      .get()
      .then(
        (snapshot) =>
          snapshot.docs.map((d) => ({ ...d.data(), uid: d.id })) as HabitLog[]
      );

    const daysStatisticsArr: DayStatistics[] = dates.map((date) => {
      const dayEnum = dayjs(date).format('dddd') as keyof typeof DaysEnum;

      return {
        day: date,
        habits: habits
          .filter((habit) => {
            return (
              habit.repeatDays.includes(DaysEnum[dayEnum]) &&
              (!habit.deletedAt ||
                firestoreToDayjs(habit.deletedAt).isAfter(date, 'day'))
            );
          })
          .map((habit) => {
            return {
              ...habit,
              log: habitsLogs?.find((log) => {
                return (
                  log.habitUid === habit.uid &&
                  date.isSame(firestoreToDayjs(log.createdAt), 'day')
                );
              }),
            };
          }) as HabitWithLog[],
      };
    });

    setDaysStatistics((prev) => [...prev, ...daysStatisticsArr]);

    finishLoading();
  };

  return { daysStatistics, isLoading, fetchMore: fetchStatistics };
};

export default useStatisticList;
