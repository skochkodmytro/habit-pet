import { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Entypo from '@expo/vector-icons/Entypo';

import { ThemedText } from './ThemedText';

type HeaderProps = {
  title?: string;
  renderRightBlock?: ReactNode;
  enableGoBack?: boolean;
  onGoBack?: () => void;
};

const Header = ({
  title,
  renderRightBlock,
  enableGoBack = true,
  onGoBack,
}: HeaderProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerLeftBlock}>
        {(router.canGoBack() && enableGoBack) || !!onGoBack ? (
          <TouchableOpacity
            hitSlop={12}
            onPress={!!onGoBack ? onGoBack : router.back}
          >
            <Entypo name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
        ) : null}

        {title ? <ThemedText type="subtitle">{title}</ThemedText> : null}
      </View>

      {renderRightBlock}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 0.5,
    borderColor: '#D3D3D3',
    backgroundColor: 'white',
  },
  headerLeftBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default Header;
