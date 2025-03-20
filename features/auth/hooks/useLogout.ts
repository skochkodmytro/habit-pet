import auth from '@react-native-firebase/auth';

const useLogout = () => {
  return () => {
    // clear store, storage etc here if need
    auth().signOut();
  };
};

export default useLogout;
