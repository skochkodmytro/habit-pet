import { useCallback, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import DraggableFlatList, {
  DragEndParams,
  RenderItem,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { Asset } from 'expo-media-library';

import { Header } from '@/components';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/constants/Device';

import { useCreatePostStore } from '../store';

const EditSelectedAssetsView = () => {
  const { assets } = useCreatePostStore();
  const [data, setData] = useState(assets as Asset[]);

  const handleDragEnd = (params: DragEndParams<Asset>) => {
    setData(params.data);
  };

  const renderAsset: RenderItem<Asset> = useCallback(({ item, drag }) => {
    return (
      <ScaleDecorator activeScale={1.01}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: DEVICE_WIDTH - 120,
          }}
          onLongPress={drag}
        >
          <Image
            source={item}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'lightgray',
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  }, []);

  const keyExtractor = (item: Asset) => item.id;

  return (
    <View style={styles.screen}>
      <Header title="Edit" />
      {Array.isArray(assets) ? (
        <DraggableFlatList
          data={data}
          horizontal
          renderItem={renderAsset}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            height: DEVICE_HEIGHT / 2,
            paddingHorizontal: 60,
            gap: 10,
            paddingTop: 50,
          }}
          onDragEnd={handleDragEnd}
          pagingEnabled
          snapToInterval={DEVICE_WIDTH - 110}
          decelerationRate="fast"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default EditSelectedAssetsView;
