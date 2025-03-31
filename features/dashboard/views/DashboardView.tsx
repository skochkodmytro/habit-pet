import { useMemo } from 'react';
import { RefreshControl, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, ThemedText } from '@/components';
import { Colors } from '@/constants/Colors';
import { useBoolean } from '@/hooks';

import { DailyPlanModal, HabitLogsList } from '../components';
import { useDailyPlan, useTodayHabitsLogs } from '../hooks';

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

  const { dailyPlanItems, isLoading: isDailyPlanLoading } =
    useDailyPlan(habitsWithLogs);

  const {
    value: isOpenDailyPlanModal,
    setTrue: openDailyPlanModal,
    setFalse: closeDailyPlanModal,
  } = useBoolean(false);

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

      <ThemedText></ThemedText>

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

      {dailyPlanItems.length > 0 ? (
        <View style={styles.buttonWrapper}>
          <Button loading={isDailyPlanLoading} onPress={openDailyPlanModal}>
            Show daily plans
          </Button>
        </View>
      ) : null}

      <DailyPlanModal
        visible={isOpenDailyPlanModal}
        dailyPlanItems={dailyPlanItems}
        onClose={closeDailyPlanModal}
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
  buttonWrapper: {
    padding: 12,
  },
});

export default DashboardView;
