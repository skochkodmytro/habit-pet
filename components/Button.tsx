import { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  textStyle?: TextStyle;
};

const Button = ({
  children,
  disabled = false,
  loading = false,
  style,
  textStyle,
  onPress,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <ActivityIndicator color="#fff" /> : null}
      <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#63A1F2',
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#D1E4FB',
    elevation: 0,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  textDisabled: {
    color: '#A9A9A9',
  },
});

export default Button;
