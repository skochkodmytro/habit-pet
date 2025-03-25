import dayjs from 'dayjs';

import { DaysEnum } from '@/features/habits';

export const getTodayEnumDay = (): DaysEnum => {
  const today = dayjs().format('dddd') as keyof typeof DaysEnum;
  return DaysEnum[today] || null;
};

export const firestoreToDayjs = (timestamp: any) => {
  if (
    !timestamp ||
    typeof timestamp._seconds !== 'number' ||
    typeof timestamp._nanoseconds !== 'number'
  ) {
    throw new Error('Invalid Firestore timestamp object');
  }

  const milliseconds =
    timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1e6);
  return dayjs(milliseconds);
};
