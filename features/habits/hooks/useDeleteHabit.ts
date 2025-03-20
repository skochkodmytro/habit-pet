import firestore from '@react-native-firebase/firestore';

import { useHabitsStore } from '../store';

const habitCollection = firestore().collection('Habits');

const useDeleteHabit = () => {
  const { habits, setHabits } = useHabitsStore();

  return (habitUid: string) => {
    habitCollection
      .doc(habitUid)
      .delete()
      .then(() => {
        setHabits(habits.filter((habit) => habit.uid !== habitUid));
      });
  };
};

export default useDeleteHabit;
