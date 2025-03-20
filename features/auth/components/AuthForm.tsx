import { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText, Button, Input } from '@/components';
import { useKeyboard, useBoolean } from '@/hooks';

import { EmailAuthRequestDto } from '../types';

type AuthFormProps = {
  title: string;
  buttonText: string;
  linkText: string;
  onSubmit: (values: EmailAuthRequestDto) => Promise<void>;
  onLinkPress: () => void;
};

const AuthForm = ({
  title,
  buttonText,
  linkText,
  onSubmit,
  onLinkPress,
}: AuthFormProps) => {
  const insets = useSafeAreaInsets();
  const { isKeyboardVisible } = useKeyboard();

  const [authValues, setAuthValues] = useState<EmailAuthRequestDto>({
    email: '',
    password: '',
  });
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(false);

  const onChangeValue =
    (key: keyof EmailAuthRequestDto) => (newValue: string) => {
      setAuthValues({ ...authValues, [key]: newValue });
    };

  const handleSubmit = async () => {
    startLoading();
    onSubmit(authValues).finally(finishLoading);
  };

  const paddingBottom = isKeyboardVisible ? 10 : insets.bottom;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.wrapper, { paddingTop: insets.top }]}
    >
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>

      <View style={styles.formWrapper}>
        <Input
          value={authValues.email}
          placeholder="example@gmail.com"
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={onChangeValue('email')}
        />
        <Input
          value={authValues.password}
          placeholder="Type password"
          label="Password"
          secureTextEntry
          onChangeText={onChangeValue('password')}
        />
      </View>

      <ThemedText style={styles.linkText} onPress={onLinkPress}>
        {linkText}
      </ThemedText>

      <View style={[styles.buttonWrapper, { paddingBottom }]}>
        <Button loading={isLoading} onPress={handleSubmit}>
          {buttonText}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    marginBottom: 30,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  linkText: {
    textAlign: 'right',
    marginTop: 10,
    color: 'blue',
  },
  formWrapper: {
    gap: 10,
  },
});

export default AuthForm;
