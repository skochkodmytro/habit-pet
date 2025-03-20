import {
  View,
  StyleSheet,
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';

import { Colors } from '@/constants/Colors';

const Spinner = (props: ActivityIndicatorProps) => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator color={Colors.dark.primary} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default Spinner;
