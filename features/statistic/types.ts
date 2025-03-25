import { Dayjs } from 'dayjs';

import { HabitWithLog } from '@/features/dashboard';

export type DayStatistics = {
  day: Dayjs;
  habits: HabitWithLog[];
};
