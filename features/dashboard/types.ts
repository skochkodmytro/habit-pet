import { HabitLog } from '@/features/habit-logs';

import { Habit } from '../habits';

export type HabitWithLog = Habit & {
  log?: HabitLog;
};
