import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Chat = {
  uid: string;
  title: string;
  password: string;
  membersIds: string[];
  creatorId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type Message = {
  uid: string;
  text: string;
  chatUid: string;
  senderUid: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
