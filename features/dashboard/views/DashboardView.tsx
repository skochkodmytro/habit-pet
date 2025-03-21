// import { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { SwipeListView } from 'react-native-swipe-list-view';

import { Button, ThemedText } from '@/components';
import { useLogout } from '@/features/auth';
// import { useWeekDateHabits } from '@/features/habits';
// import { DaysEnum } from '@/features/habits/types';

const DashboardView = () => {
  const logout = useLogout();
  const insets = useSafeAreaInsets();

  // const day = useMemo(() => {
  //   return [DaysEnum.Wednesday];
  // }, []);

  // const { habits } = useWeekDateHabits(day);

  return (
    <View style={{ paddingTop: insets.top, paddingHorizontal: 12 }}>
      <ThemedText type="title">Welcome back</ThemedText>
      <Button onPress={logout}>Log Out</Button>

      {/* <SwipeListView
        data={['first', 'second', 'third']}
        renderItem={(data) => (
          <View
            style={{
              height: 40,
              justifyContent: 'center',
              backgroundColor: 'red',
              marginBottom: 20,
            }}
          >
            <ThemedText>I am {data.item} in a SwipeListView</ThemedText>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={{ backgroundColor: 'blue', height: 40 }}>
            <ThemedText>Left</ThemedText>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-25}
      /> */}
    </View>
  );
};

export default DashboardView;
