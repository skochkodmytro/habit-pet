import auth from '@react-native-firebase/auth';

import { useChatsStore } from '@/features/chat';
import { useHabitsStore } from '@/features/habits';
import { useCreatePostStore } from '@/features/user-media';

const useLogout = () => {
  const { reset: resetChatStore } = useChatsStore();
  const { reset: resetHabitStore } = useHabitsStore();
  const { reset: resetCreatePostStore } = useCreatePostStore();

  return () => {
    // clear store, storage etc here if need
    resetCreatePostStore();
    resetChatStore();
    resetHabitStore();

    auth().signOut();
  };
};

export default useLogout;
