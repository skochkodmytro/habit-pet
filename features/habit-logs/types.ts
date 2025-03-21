import { FieldValue } from '@react-native-firebase/firestore';

export interface HabitLog {
  uid: string;
  userUid: string;
  habitUid: string;
  createdAt: FieldValue;
}
