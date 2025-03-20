import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, ThemedText } from '@/components';
import { useLogout } from '@/features/auth';

const DashboardView = () => {
  const logout = useLogout();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, paddingHorizontal: 12 }}>
      <ThemedText type="title">Welcome back</ThemedText>
      <Button onPress={logout}>Log Out</Button>
    </View>
  );
};

export default DashboardView;
