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
  name: string;
  description?: string;
  repeatDays: DaysEnum[];
};

export type CreateHabitRequestDto = Omit<Habit, 'uid'>;
