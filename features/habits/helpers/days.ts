import { DAYS_OPTIONS } from '../constants/days';
import { DaysEnum } from '../types';

export const getDaysOptions = (days: DaysEnum[]) => {
  return DAYS_OPTIONS.filter((d) => days.includes(d.value));
};
