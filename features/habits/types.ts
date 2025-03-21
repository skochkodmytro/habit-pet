import { FieldValue } from '@react-native-firebase/firestore';

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
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type CreateOrUpdateHabitRequestDto = Omit<
  Habit,
  'uid' | 'userUid' | 'createdAt' | 'updatedAt'
> & {
  uid?: string | null;
};
