import { useMemo } from 'react';
import dayjs from 'dayjs';

import {
  useCreateHabitLog,
  useGetHabitLogs,
  useRemoveHabitLog,
} from '@/features/habit-logs';
import { useWeekDateHabits } from '@/features/habits';
import { getTodayEnumDay } from '@/utils';

import { HabitWithLog } from '../types';

const useTodayHabitsLogs = () => {
  const day = useMemo(() => [getTodayEnumDay()], []);
  const todayDate = useMemo(() => dayjs(), []);

  const {
    habits,
    isLoading: isHabitsLoading,
    refetch: refetchHabits,
  } = useWeekDateHabits(day);
  const {
    habitsLogs,
    isLoading: isHabitsLogsLoading,
    addHabitLog,
    removeHabitLog: removeHabitLogFromList,
    refetch: refetchLogs,
  } = useGetHabitLogs(todayDate);

  const { habitIdsProcessing, createHabitLog } = useCreateHabitLog({
    onSuccess: addHabitLog,
  });
  const { habitIdsProcessing: habitLogsIdsProcessing, removeHabitLog } =
    useRemoveHabitLog({
      onSuccess: removeHabitLogFromList,
    });

  const habitsWithLogs: HabitWithLog[] = useMemo(() => {
    return habits.map((habit) => {
      const findLogForHabit = habitsLogs.find(
        (log) => log.habitUid === habit.uid
      );

      return { ...habit, log: findLogForHabit || undefined };
    });
  }, [habits, habitsLogs]);

  const refetch = () => {
    if (isLoading) return;

    refetchHabits();
    refetchLogs();
  };

  const isLoading = isHabitsLoading || isHabitsLogsLoading;

  return {
    habitsWithLogs,
    isLoading,
    processingIds: [...habitIdsProcessing, ...habitLogsIdsProcessing],
    createHabitLog,
    removeHabitLog,
    refetch,
  };
};

export default useTodayHabitsLogs;
