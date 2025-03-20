import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { EmailAuthRequestDto } from '../types';
import { AuthForm } from '../components';

const SignUpView = () => {
  const router = useRouter();

  const signUp = async (values: EmailAuthRequestDto) => {
    return auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        router.replace('/(tabs)');
      })
      .catch((err: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        Alert.alert(err?.nativeErrorMessage);
      });
  };

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Sign up"
      linkText="Sign In"
      onLinkPress={router.back}
      onSubmit={signUp}
    />
  );
};

export default SignUpView;
