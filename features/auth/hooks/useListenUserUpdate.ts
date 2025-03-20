import { useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { useBoolean } from '@/hooks';

import { useUserStore } from '../store';

const useListenUserUpdate = () => {
  const { value: isInitializing, setFalse: finishInitializing } =
    useBoolean(true);
  const { user, setUser } = useUserStore();

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (isInitializing) finishInitializing();
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return { isInitializing, user };
};

export default useListenUserUpdate;
