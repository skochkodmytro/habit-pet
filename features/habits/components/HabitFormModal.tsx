import { View, StyleSheet } from 'react-native';

import { Button, CommonModal, Input, ThemedText, Tags } from '@/components';

import { Habit, CreateHabitRequestDto } from '../types';
import { DAYS_OPTIONS } from '../constants/days';

type HabitFormModalProps = {
  habit: Partial<Habit> | null;
  onClose: () => void;
  onSave: (habit: Habit | CreateHabitRequestDto) => void;
};

const HabitFormModal = ({ habit, onClose, onSave }: HabitFormModalProps) => {
  const title = habit?.uid ? 'Edit' : 'Create';

  return (
    <CommonModal visible={!!habit} onClose={onClose}>
      <ThemedText type="subtitle">{title} habit</ThemedText>

      <View style={styles.form}>
        <Input placeholder="Name" />
        <Input placeholder="Description" textarea />
        <Tags label="Select frequency" tags={DAYS_OPTIONS} value={['f']} />
      </View>

      <Button>{title}</Button>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginVertical: 10,
  },
});

export default HabitFormModal;
