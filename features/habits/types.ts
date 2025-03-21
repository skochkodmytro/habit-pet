export enum DaysEnum {
  Monday = 'M',
  Tuesday = 'Tu',
  Wednesday = 'W',
  Thursday = 'Th',
  Friday = 'F',
  Saturday = 'Sa',
  Sunday = 'Su',
}

export type Habit = {
  uid: string;
  userUid: string;
  name: string;
  description?: string;
  repeatDays: DaysEnum[];
};

export type CreateOrUpdateHabitRequestDto = Omit<Habit, 'uid' | 'userUid'> & {
  uid?: string | null;
};
