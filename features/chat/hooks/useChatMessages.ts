import { useEffect, useMemo } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import { useChatsStore } from '../store';
import { Message } from '../types';

const TAKE = 20;
const messagesCollection = firestore().collection('Messages');

const useChatMessages = (chatId: string) => {
  const { chatsMessages, setChatsMessages } = useChatsStore();

  const chatInfo = useMemo(() => {
    return chatsMessages[chatId];
  }, [chatId, chatsMessages]);

  useEffect(() => {
    fetchMessages();
    const unsubscribe = listenToMessages();

    return () => unsubscribe();
  }, []);

  const fetchMessages = async () => {
    if (chatInfo?.isLoading || chatInfo?.isFetchedAll) return;

    setChatsMessages(chatId, { isLoading: true });

    let query = messagesCollection
      .orderBy('createdAt', 'desc')
      .where('chatUid', '==', chatId);

    if (chatInfo?.lastMessage) {
      query = query.startAfter(chatInfo?.lastMessage);
    }

    query
      .limit(TAKE)
      .get()
      .then((querySnapshot) => {
        const lastMessage = querySnapshot.docs[querySnapshot.docs.length - 1];

        setChatsMessages(chatId, {
          lastMessage: lastMessage || null,
          messages: [
            ...(chatInfo?.messages || []),
            ...querySnapshot.docs.map((doc) => {
              const data = doc.data() as Message;

              return {
                _id: doc.id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: { _id: data.senderUid },
              } as IMessage;
            }),
          ],
          isFetchedAll: querySnapshot.docs.length < TAKE,
        });
      })
      .finally(() => {
        setChatsMessages(chatId, { isLoading: false });
      });
  };

  const listenToMessages = () => {
    let isFirstLoading = true;

    return messagesCollection
      .where('chatUid', '==', chatId)
      .orderBy('createdAt', 'desc')
      .limit(TAKE)
      .onSnapshot((snapshot) => {
        if (isFirstLoading || snapshot.empty) {
          isFirstLoading = false;
          return;
        }

        const newMessages = snapshot
          .docChanges()
          .filter((change) => change.type === 'added')
          .map((change) => {
            const data = change.doc.data() as Message;

            const createdAt = data.createdAt
              ? data.createdAt.toDate()
              : new Date();

            return {
              _id: change.doc.id,
              text: data.text,
              createdAt,
              user: { _id: data.senderUid },
            } as IMessage;
          })
          .filter((msg) => msg !== null);

        const latestState = useChatsStore.getState();
        const currentMessages =
          latestState.chatsMessages[chatId]?.messages || [];
        const first20Messages = currentMessages.slice(0, TAKE);

        const filteredMessages = newMessages.filter(
          (item) => !first20Messages.find((m) => m._id === item._id)
        );

        setChatsMessages(chatId, {
          messages: [...filteredMessages, ...currentMessages],
        });
      });
  };

  const createMessage = async (message: IMessage) => {
    messagesCollection.add({
      text: message.text,
      chatUid: chatId,
      senderUid: message.user._id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  };

  return {
    messages: chatInfo?.messages || [],
    isLoading: chatInfo?.isLoading || false,
    createMessage,
    fetchMore: fetchMessages,
  };
};

export default useChatMessages;
