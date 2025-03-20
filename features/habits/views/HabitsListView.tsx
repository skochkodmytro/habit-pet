import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Header } from '@/components';

import { HabitFormModal, HabitsList } from '../components';
import { CreateOrUpdateHabitRequestDto, Habit } from '../types';
import { useCreateOrUpdateHabit, useDeleteHabit } from '../hooks';

const HabitsListView = () => {
  const [habitForAction, setHabitForAction] = useState<Partial<Habit> | null>(
    null
  );

  const { isLoading, onCreateOrUpdateHabit } = useCreateOrUpdateHabit();
  const deleteHabit = useDeleteHabit();

  const handleHabitAction = async (habit: CreateOrUpdateHabitRequestDto) => {
    onCreateOrUpdateHabit(habit)
      .then(() => setHabitForAction(null))
      .catch((err) => {
        if (err?.nativeErrorMessage) {
          Alert.alert(err?.nativeErrorMessage);
        }
      });
  };

  const handleDeleteHabit = (habitUid: string) => {
    Alert.alert('Delete Habit', 'Are you sure you want to delete this habit', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        style: 'destructive',
        onPress: () => deleteHabit(habitUid),
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Habits"
        enableGoBack={false}
        renderRightBlock={
          <TouchableOpacity hitSlop={12} onPress={() => setHabitForAction({})}>
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
        }
      />

      <HabitsList
        onHabitEdit={setHabitForAction}
        onHabitDelete={handleDeleteHabit}
      />

      <HabitFormModal
        habit={habitForAction}
        isLoading={isLoading}
        onClose={() => setHabitForAction(null)}
        onSave={handleHabitAction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default HabitsListView;
