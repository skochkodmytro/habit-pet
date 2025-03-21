import { FlatList, ListRenderItem, View, StyleSheet } from 'react-native';

import { Spinner, ThemedText } from '@/components';

import { useHabitList } from '../hooks';
import { Habit } from '../types';
import { getDaysOptions } from '../helpers/days';

import HabitCard from './HabitCard';

type HabitsListProps = {
  onHabitEdit: (habit: Habit) => void;
  onHabitDelete: (uid: string) => void;
};

const HabitsList = ({ onHabitDelete, onHabitEdit }: HabitsListProps) => {
  const { habits, isLoading, fetchMoreHabits } = useHabitList();

  const onFetchMore = () => fetchMoreHabits();

  const renderHabitCard: ListRenderItem<Habit> = ({ item }) => {
    const daysOptions = getDaysOptions(item.repeatDays);

    return (
      <View style={styles.cardWrapper}>
        <HabitCard
          habit={item}
          daysOptions={daysOptions}
          onDelete={onHabitDelete}
          onEdit={() => onHabitEdit(item)}
        />
      </View>
    );
  };

  const renderFooter = () => {
    if (!isLoading) return null;

    return <Spinner />;
  };

  const renderEmpty = () => {
    if (isLoading || habits.length > 0) return null;

    return <ThemedText style={styles.emptyText}>No habits yet</ThemedText>;
  };

  const keyExtractor = (item: Habit) => item.uid;

  return (
    <FlatList
      data={habits}
      renderItem={renderHabitCard}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.5}
      onEndReached={onFetchMore}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  emptyText: {
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  cardWrapper: {
    marginBottom: 20,
  },
});

export default HabitsList;
