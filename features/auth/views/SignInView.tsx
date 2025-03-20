import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { EmailAuthRequestDto } from '../types';
import { AuthForm } from '../components';

const SignInView = () => {
  const router = useRouter();

  const signIn = async (values: EmailAuthRequestDto) => {
    return auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        router.replace('/(tabs)');
      })
      .catch((err: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        Alert.alert(err?.nativeErrorMessage);
      });
  };

  return (
    <AuthForm
      title="Sign In"
      buttonText="Sign in"
      linkText="Sign Up"
      onLinkPress={() => router.push('/(auth)/sign-up')}
      onSubmit={signIn}
    />
  );
};

export default SignInView;
