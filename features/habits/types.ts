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
  isDeleted?: boolean;
  deletedAt?: FieldValue | null;
};

export type CreateOrUpdateHabitRequestDto = Omit<
  Habit,
  'uid' | 'userUid' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'deletedAt'
> & {
  uid?: string | null;
};
