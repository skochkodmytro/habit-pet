import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';

import { ThemedText } from './ThemedText';

type InputProps = TextInputProps & {
  label?: string;
  errorMessage?: string;
  textarea?: boolean;
};

const Input = ({
  label,
  errorMessage,
  style,
  textarea = false,
  ...props
}: InputProps) => {
  return (
    <View style={styles.container}>
      {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}
      <TextInput
        style={[
          styles.input,
          errorMessage && styles.inputError,
          textarea && styles.textarea,
          style,
        ]}
        multiline={textarea}
        placeholder="Enter text"
        placeholderTextColor="#A9A9A9"
        {...props}
      />
      {errorMessage ? (
        <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#FF4D4F',
    backgroundColor: '#FFEEF0',
  },
  errorText: {
    fontSize: 12,
    color: '#FF4D4F',
    marginTop: 4,
  },
  textarea: {
    height: 120,
  },
});

export default Input;
