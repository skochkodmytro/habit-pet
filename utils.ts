import dayjs from 'dayjs';

import { DaysEnum } from './features/habits';

export const getTodayEnumDay = (): DaysEnum => {
  const today = dayjs().format('dddd') as keyof typeof DaysEnum;
  return DaysEnum[today] || null;
};
