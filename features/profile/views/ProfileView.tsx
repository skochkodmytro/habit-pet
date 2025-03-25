import { View, StyleSheet } from 'react-native';

import { Button, Header } from '@/components';
import { useLogout } from '@/features/auth';

const ProfileView = () => {
  const logout = useLogout();

  return (
    <View style={styles.screen}>
      <Header title="Profile" enableGoBack={false} />

      <View style={{ padding: 12 }}>
        <Button onPress={logout}>Log Out</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ProfileView;
