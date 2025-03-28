import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useBoolean } from '@/hooks';
import { useUserStore } from '@/features/auth';

import { Chat } from '../types';
import { useChatsStore } from '../store';

const chatsCollections = firestore().collection('Chats');

// add, join and remove chat
const useChatAction = () => {
  const { user } = useUserStore();
  const { chats, setChats } = useChatsStore();

  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(false);

  const createChat = async (title: string, password: string) => {
    startLoading();

    return chatsCollections
      .add({
        title,
        password,
        membersIds: [user?.uid],
        creatorId: user?.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then((newDoc) => {
        return newDoc.get();
      })
      .then((docSnapshot) => {
        const newChat = {
          ...docSnapshot.data(),
          uid: docSnapshot.id,
        } as Chat;

        setChats([newChat, ...chats]);
      })
      .finally(() => {
        finishLoading();
      });
  };

  const joinChat = (password: string) => {
    startLoading();

    return chatsCollections
      .where('password', '==', password)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          throw new Error('Chat not found');
        }

        const fetchedChat = {
          ...querySnapshot.docs[0].data(),
          uid: querySnapshot.docs[0].id,
        } as Chat;

        if (fetchedChat.membersIds.includes(user?.uid as string)) {
          throw new Error(`You've joined already`);
        }

        return chatsCollections
          .doc(querySnapshot.docs[0].id)
          .update({
            membersIds: [...fetchedChat.membersIds, user?.uid],
            updatedAt: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => querySnapshot.docs[0].ref.get());
      })
      .then((updatedDoc) => {
        if (!updatedDoc.exists) {
          throw new Error('Failed to fetch updated chat');
        }

        const updatedChat = {
          ...updatedDoc.data(),
          uid: updatedDoc.id,
        } as Chat;

        setChats([updatedChat, ...chats]);
      })
      .catch((e) => {
        Alert.alert(e?.message);
        return Promise.reject(e);
      })
      .finally(finishLoading);
  };

  return { isLoading, createChat, joinChat };
};

export default useChatAction;
