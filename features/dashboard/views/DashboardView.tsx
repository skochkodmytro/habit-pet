import { useMemo } from 'react';
import { RefreshControl, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components';
import { Colors } from '@/constants/Colors';

import { HabitLogsList } from '../components';
import { useTodayHabitsLogs } from '../hooks';

const DashboardView = () => {
  const insets = useSafeAreaInsets();

  const {
    habitsWithLogs,
    isLoading,
    processingIds,
    createHabitLog,
    removeHabitLog,
    refetch,
  } = useTodayHabitsLogs();

  const title = useMemo(() => {
    let welcomeComeTitle = 'Welcome back, ';
    const leftTasksCount = habitsWithLogs.filter((habit) => !habit.log).length;

    if (leftTasksCount) {
      welcomeComeTitle += `left ${leftTasksCount} task to do`;
    } else {
      welcomeComeTitle += `you have done all task for today!`;
    }

    return welcomeComeTitle;
  }, [habitsWithLogs]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <ThemedText type="title">{title}</ThemedText>
      </View>

      <HabitLogsList
        data={habitsWithLogs}
        processingIds={processingIds}
        onCreateLog={createHabitLog}
        onDeleteLog={removeHabitLog}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor={Colors.dark.primary}
            onRefresh={refetch}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 12,
    gap: 10,
  },
});

export default DashboardView;
