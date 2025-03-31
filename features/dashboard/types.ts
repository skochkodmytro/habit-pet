import { HabitLog } from '@/features/habit-logs';

import { Habit } from '../habits';

export type HabitWithLog = Habit & {
  log?: HabitLog;
};

export type DailyPlanItem = {
  time: string;
  title: string;
  description: string;
};
