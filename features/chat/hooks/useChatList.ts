import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useUserStore } from '@/features/auth';

import { useChatsStore } from '../store';
import { Chat } from '../types';

const TAKE = 10;
const chatsCollection = firestore().collection('Chats');

const useChatList = () => {
  const { user } = useUserStore();

  const {
    chats,
    isLoading,
    isFetchedAll,
    lastChat,
    setChats,
    setLastChat,
    setIsFetchedAll,
    setIsLoading,
  } = useChatsStore();

  useEffect(() => {
    fetchMoreChats(true);
  }, []);

  const fetchMoreChats = (isFirstRequest: boolean = false) => {
    if (!isFirstRequest && (isLoading || isFetchedAll)) return;

    setIsLoading(true);

    let query = chatsCollection
      .orderBy('createdAt', 'desc')
      .where('membersIds', 'array-contains', user?.uid);

    if (lastChat) {
      query = query.startAfter(lastChat);
    }

    query
      .limit(TAKE)
      .get()
      .then((querySnapshot) => {
        const lastChat = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastChat(lastChat);

        setChats([
          ...chats,
          ...querySnapshot.docs.map(
            (doc) => ({ ...doc.data(), uid: doc.id }) as Chat
          ),
        ]);

        if (querySnapshot.docs.length < TAKE) setIsFetchedAll(true);
      })
      .finally(() => setIsLoading(false));
  };

  return { chats, isLoading, fetchMoreChats };
};

export default useChatList;
