import { create } from 'zustand';
import { IMessage, User } from 'react-native-gifted-chat';

import { Chat } from '../types';

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type Document =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

type ChatMessages = {
  messages: IMessage[];
  members: User[];
  lastMessage: Document | null;
  isFetchedAll: boolean;
  isLoading: boolean;
};

interface ChatsStore {
  chats: Chat[];
  isLoading: boolean;
  isFetchedAll: boolean;
  lastChat: Document | null;
  chatsMessages: Record<string, ChatMessages>;

  setChatsMessages: (id: string, info: Partial<ChatMessages>) => void;
  setChats: (chats: Chat[]) => void;
  setIsLoading: (value: boolean) => void;
  setIsFetchedAll: (value: boolean) => void;
  setLastChat: (chat: Document) => void;

  reset: () => void;
}

const initialStore = {
  chats: [],
  isLoading: true,
  isFetchedAll: false,
  lastChat: null,
  chatsMessages: {},
};

export const useChatsStore = create<ChatsStore>((set) => ({
  ...initialStore,
  setChats: (chats) => set({ chats }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setIsFetchedAll: (isFetchedAll) => set({ isFetchedAll }),

  setLastChat: (lastChat) => set({ lastChat }),

  setChatsMessages: (id, info) =>
    set((state) => {
      const updatedChatsMessages = {
        ...state.chatsMessages,
        [id]: { ...state.chatsMessages[id], ...info },
      };
      return { chatsMessages: updatedChatsMessages };
    }),

  reset: () => set(initialStore),
}));
