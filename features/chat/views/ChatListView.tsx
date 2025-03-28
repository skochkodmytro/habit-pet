import { useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Header } from '@/components';
import { useBoolean } from '@/hooks';

import { ChatList, CreateOrJoinChatModal } from '../components';
import { useChatAction, useChatList } from '../hooks';

const ChatListView = () => {
  const router = useRouter();

  const { chats, isLoading: isChatsLoading, fetchMoreChats } = useChatList();
  const { isLoading, createChat, joinChat } = useChatAction();

  const {
    value: isModalOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

  const handleCreateChat = async (title: string, password: string) => {
    return createChat(title, password).then(closeModal);
  };

  const handleJoinChat = async (password: string) => {
    return joinChat(password).then(closeModal);
  };

  const handlePressOnChat = useCallback((chatId: string) => {
    router.push(`/(tabs)/(chat)/chat/${chatId}`);
  }, []);

  const renderHeaderRight = useMemo(
    () => (
      <View style={styles.headerActions}>
        <TouchableOpacity hitSlop={12} onPress={openModal}>
          <Ionicons name="create" size={24} color="black" />
        </TouchableOpacity>
      </View>
    ),
    []
  );

  return (
    <View style={styles.screen}>
      <Header
        title="Chats"
        enableGoBack={false}
        renderRightBlock={renderHeaderRight}
      />

      <ChatList
        data={chats}
        isLoading={isChatsLoading}
        fetchMore={fetchMoreChats}
        onChatPress={handlePressOnChat}
      />

      <CreateOrJoinChatModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onClose={closeModal}
        onCreateChat={handleCreateChat}
        onJoinChat={handleJoinChat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});

export default ChatListView;
