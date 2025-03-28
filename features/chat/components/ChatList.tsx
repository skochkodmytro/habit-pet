import { useCallback } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';

import { Spinner, ThemedText } from '@/components';
import { dateFormat } from '@/utils/date';

import { Chat } from '../types';

type ChatListProps = Omit<FlatListProps<Chat>, 'renderItem'> & {
  isLoading?: boolean;
  fetchMore?: () => void;
  onChatPress?: (chatId: string) => void;
};

const ChatList = ({
  isLoading,
  data,
  fetchMore,
  onChatPress,
  ...props
}: ChatListProps) => {
  const renderChat: ListRenderItem<Chat> = useCallback(({ item }) => {
    const createdAt = dayjs(item.createdAt.toDate()).format(dateFormat);

    return (
      <TouchableOpacity
        style={styles.chatItem}
        disabled={!onChatPress}
        onPress={() => onChatPress?.(item.uid)}
      >
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.title}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.dateText}>{createdAt}</ThemedText>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderFooter = useCallback(() => {
    if (isLoading) return <Spinner />;
    return null;
  }, [isLoading]);

  const renderEmptyList = useCallback(() => {
    if (!isLoading && data?.length === 0)
      return <ThemedText style={styles.emptyText}>No chats yet</ThemedText>;

    return null;
  }, [isLoading]);

  const keyExtractor = useCallback((item: Chat) => item.uid, []);

  return (
    <FlatList
      data={data}
      renderItem={renderChat}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyList}
      contentContainerStyle={styles.list}
      onEndReachedThreshold={0.5}
      onEndReached={fetchMore}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  chatItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
  },
  dateText: {
    color: 'gray',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 18,
  },
});

export default ChatList;
