import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Header, ThemedText } from '@/components';
import { useUserStore } from '@/features/auth';

import useChatMessages from '../hooks/useChatMessages';

const SingleChatView = () => {
  const bottomTabsHeight = useBottomTabBarHeight();
  const { id: chatId } = useLocalSearchParams();

  const { user } = useUserStore();

  const { messages, isLoading, createMessage, fetchMore } = useChatMessages(
    chatId as string
  );

  const renderEmptyChat = useCallback(() => {
    return (
      <ThemedText
        style={{
          textAlign: 'center',
          paddingVertical: 10,
          color: 'lightgray',
          transform: [{ scaleY: -1 }],
        }}
      >
        No messages yet
      </ThemedText>
    );
  }, []);

  return (
    <View style={styles.screen}>
      <Header title="Back" />
      <GiftedChat
        messages={messages}
        user={{
          _id: user?.uid as string,
        }}
        listViewProps={{
          // @ts-ignore
          onEndReachedThreshold: 0.5,
          onEndReached: fetchMore,
        }}
        bottomOffset={-bottomTabsHeight}
        loadEarlier={isLoading}
        isLoadingEarlier={isLoading}
        onSend={(messages) => {
          if (messages[0]) createMessage(messages[0]);
        }}
        renderChatEmpty={renderEmptyChat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default SingleChatView;
