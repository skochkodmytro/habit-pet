import React, { useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatListProps,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { ThemedText } from '@/components';

import { HabitWithLog } from '../types';

type HabitLogsListProps = Omit<FlatListProps<HabitWithLog>, 'renderItem'> & {
  data: HabitWithLog[];
  processingIds?: string[];
  onCreateLog: (habitUid: string) => Promise<unknown>;
  onDeleteLog: (logUid: string) => Promise<unknown>;
};

const HabitLogsList: React.FC<HabitLogsListProps> = ({
  data,
  processingIds,
  onCreateLog,
  onDeleteLog,
  ...rest
}) => {
  const listRef = useRef<any>();

  const handleActionHabit = useCallback(
    (habit: HabitWithLog) => async () => {
      try {
        if (!habit.log) {
          await onCreateLog(habit.uid);
        } else {
          await onDeleteLog(habit.log.uid);
        }
      } catch (e) {
        console.log(e);
      } finally {
        listRef?.current?.closeAllOpenRows();
      }
    },
    [onCreateLog, onDeleteLog]
  );

  const renderItem = useCallback(
    ({ item }: { item: HabitWithLog }) => (
      <View style={styles.habitCard}>
        {!!item.log ? <View style={styles.habitCardDone} /> : null}

        <ThemedText type="subtitle" style={styles.title}>
          {item.name}
        </ThemedText>
      </View>
    ),
    []
  );

  const renderHiddenItem = useCallback(
    ({ item }: { item: HabitWithLog }) => {
      const isLoading =
        processingIds?.includes(item.uid) ||
        (item?.log && processingIds?.includes(item?.log?.uid));

      return (
        <View style={styles.hiddenRow}>
          <TouchableOpacity
            style={[
              styles.action,
              item.log ? styles.actionDelete : styles.actionSuccess,
            ]}
            disabled={isLoading}
            onPress={handleActionHabit(item)}
          >
            {isLoading ? <ActivityIndicator color="white" /> : null}
            <ThemedText style={styles.actionText}>
              {item.log ? 'Remove log' : 'Done'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      );
    },
    [handleActionHabit, processingIds]
  );

  const keyExtractor = (item: HabitWithLog) => item.uid;

  return (
    <SwipeListView
      ref={listRef}
      data={data}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      keyExtractor={keyExtractor}
      rightOpenValue={-135}
      disableRightSwipe
      closeOnRowBeginSwipe
      closeOnRowPress
      useFlatList
      {...rest}
    />
  );
};

HabitLogsList.displayName = 'HabitLogsList';

const styles = StyleSheet.create({
  list: {
    gap: 10,
    flexGrow: 1,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  habitCard: {
    padding: 12,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    overflow: 'hidden',
  },
  habitCardDone: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(72, 239, 128, 0.2)',
  },
  title: {
    fontSize: 18,
  },
  hiddenRow: {
    alignItems: 'flex-end',
  },
  action: {
    height: 60,
    width: 125,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionSuccess: {
    backgroundColor: '#22bb33',
  },
  actionDelete: {
    backgroundColor: '#bb2124',
  },
});

export default HabitLogsList;
