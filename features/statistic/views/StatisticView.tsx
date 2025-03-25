import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';

import { Header, ThemedText } from '@/components';
import { DEVICE_WIDTH } from '@/constants/Device';
import { HabitLogsList } from '@/features/dashboard';

import { useStatisticList } from '../hooks';
import { DayStatistics } from '../types';

const StatisticView = () => {
  const { daysStatistics, fetchMore } = useStatisticList();

  const renderDayStatistic: ListRenderItem<DayStatistics> = ({ item }) => {
    const completedTasksCount = item.habits.filter((h) => !!h.log).length;
    const unCompletedTasksCount = item.habits.length - completedTasksCount;

    const title = !unCompletedTasksCount
      ? `You have finished all tasks!`
      : `You haven't finished ${unCompletedTasksCount} tasks`;

    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'gray',
          width: DEVICE_WIDTH,
        }}
      >
        <View style={{ padding: 12, marginBottom: 12 }}>
          <ThemedText type="subtitle">
            {item.day.format('MM/DD/YYYY')}
          </ThemedText>
          <ThemedText type="title">{title}</ThemedText>
        </View>

        <HabitLogsList data={item.habits} disableLeftSwipe={true} />
      </View>
    );
  };

  const keyExtractor = (item: DayStatistics) =>
    `${item.day.format('YYYY MM DD')}`;

  return (
    <View style={styles.screen}>
      <Header title="Statistic" enableGoBack={false} />
      <FlatList
        data={daysStatistics}
        renderItem={renderDayStatistic}
        keyExtractor={keyExtractor}
        horizontal
        inverted
        pagingEnabled
        bounces={false}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default StatisticView;
