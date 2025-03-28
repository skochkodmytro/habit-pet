import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import DraggableFlatList, {
  DragEndParams,
  RenderItem,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { Asset } from 'expo-media-library';

import { Header } from '@/components';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/constants/Device';
import { useBoolean } from '@/hooks';

import { useCreatePostStore } from '../store';
import { VideoItemFlatList } from '../components';

const EditSelectedAssetsView = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {
    value: isDraggable,
    setTrue: startDraggable,
    setFalse: finishDraggable,
  } = useBoolean(false);

  const { assets } = useCreatePostStore();
  const [data, setData] = useState(assets as Asset[]);

  const handleDragEnd = (params: DragEndParams<Asset>) => {
    setData(params.data);
    finishDraggable();
  };

  const onViewableItemsChanged = useRef(({ viewableItems, changed }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  const renderAsset: RenderItem<Asset> = useCallback(
    ({ item, getIndex, drag }) => {
      const isActive = activeIndex === getIndex();

      return (
        <ScaleDecorator activeScale={1.01}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: DEVICE_WIDTH - 120,
              borderRadius: 12,
              overflow: 'hidden',
            }}
            onLongPress={drag}
          >
            {item.mediaType === 'photo' ? (
              <Image source={item} style={styles.image} resizeMode="cover" />
            ) : null}
            {item.mediaType === 'video' ? (
              <VideoItemFlatList
                video={item as Asset}
                isActive={isActive && !isDraggable}
              />
            ) : null}
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [activeIndex, isDraggable]
  );

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
          onDragEnd={handleDragEnd}
          onDragBegin={startDraggable}
          contentContainerStyle={styles.list}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={DEVICE_WIDTH - 110}
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  list: {
    height: DEVICE_HEIGHT / 2,
    paddingHorizontal: 60,
    gap: 10,
    paddingTop: 50,
  },
});

export default EditSelectedAssetsView;
