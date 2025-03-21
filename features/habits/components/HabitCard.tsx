import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { Tag, Tags, ThemedText } from '@/components';

import { Habit } from '../types';

type HabitCardProps = {
  habit: Habit;
  daysOptions?: Tag[];
  onDelete: (uid: string) => void;
  onEdit: (uid: string) => void;
};

const HabitCard = ({
  habit,
  daysOptions,
  onDelete,
  onEdit,
}: HabitCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          {habit.name}
        </ThemedText>

        <View style={styles.actions}>
          <TouchableOpacity hitSlop={12} onPress={() => onEdit(habit.uid)}>
            <Feather name="edit-2" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity hitSlop={12} onPress={() => onDelete(habit.uid)}>
            <Feather name="trash" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {!!habit.description ? (
        <ThemedText style={styles.description}>{habit.description}</ThemedText>
      ) : null}

      {daysOptions ? (
        <View style={styles.tagsWrapper}>
          <ThemedText style={{ fontWeight: 'bold' }}>Repeat days:</ThemedText>
          <Tags tags={daysOptions} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
    backgroundColor: 'white',
  },
  description: {
    marginTop: 5,
  },
  title: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tagsWrapper: {
    marginTop: 5,
  },
});

export default HabitCard;
