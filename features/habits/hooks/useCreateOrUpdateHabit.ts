import firestore from '@react-native-firebase/firestore';

import { useBoolean } from '@/hooks';
import { useUserStore } from '@/features/auth';

import { CreateOrUpdateHabitRequestDto, Habit } from '../types';
import { useHabitsStore } from '../store';

const useCreateOrUpdateHabit = () => {
  const { user } = useUserStore();
  const { habits, setHabits } = useHabitsStore();

  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(false);

  const onCreateOrUpdateHabit = async (
    habit: CreateOrUpdateHabitRequestDto
  ) => {
    const { uid, ...rest } = habit;

    startLoading();

    if (!uid) {
      // create a habit
      return firestore()
        .collection('Habits')
        .add({
          ...rest,
          userUid: user?.uid,
          isDeleted: false,
          deletedAt: null,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        })
        .then((newDoc) => {
          return newDoc.get();
        })
        .then((docSnapshot) => {
          const newHabit = {
            ...docSnapshot.data(),
            uid: docSnapshot.id,
          } as Habit;

          setHabits([newHabit, ...habits]);
        })
        .finally(finishLoading);
    } else {
      // edit a habit
      return firestore()
        .collection('Habits')
        .doc(uid)
        .update({ ...rest, updatedAt: firestore.FieldValue.serverTimestamp() })
        .then(() => {
          setHabits(
            habits.map((habit) => {
              if (habit.uid === uid)
                return {
                  ...habit,
                  ...rest,
                  updatedAt: firestore.FieldValue.serverTimestamp(),
                };

              return habit;
            })
          );
        })
        .finally(finishLoading);
    }
  };

  return {
    isLoading,
    onCreateOrUpdateHabit,
  };
};

export default useCreateOrUpdateHabit;
