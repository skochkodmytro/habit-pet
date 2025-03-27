import { useMemo } from 'react';
import { Image, View } from 'react-native';
import { ImageResult } from 'expo-image-manipulator';
import ImageZoom from 'react-native-image-pan-zoom';
import { Asset } from 'expo-media-library';

import {
  SELECTED_ASSET_CONTAINER_HEIGHT,
  SELECTED_ASSET_CONTAINER_WIDTH,
} from '../constants/CreatePostLayer';

type SelectedLocalImageProps = {
  image: Asset;
  onChangeImage: (image: ImageResult) => void;
};

const SelectedLocalImage = ({
  image,
  onChangeImage,
}: SelectedLocalImageProps) => {
  const { scaledHeight, scaledWidth } = useMemo(() => {
    const imageAspectRatio = image.width / image.height;
    const containerAspectRatio =
      SELECTED_ASSET_CONTAINER_WIDTH / SELECTED_ASSET_CONTAINER_HEIGHT;

    let scaledWidth, scaledHeight;

    if (imageAspectRatio > containerAspectRatio) {
      scaledWidth = SELECTED_ASSET_CONTAINER_WIDTH;
      scaledHeight = SELECTED_ASSET_CONTAINER_WIDTH / imageAspectRatio;
    } else {
      scaledHeight = SELECTED_ASSET_CONTAINER_HEIGHT;
      scaledWidth = SELECTED_ASSET_CONTAINER_HEIGHT * imageAspectRatio;
    }

    return { scaledWidth, scaledHeight };
  }, [image]);

  return (
    <View>
      {/* @ts-ignore */}
      <ImageZoom
        cropWidth={SELECTED_ASSET_CONTAINER_WIDTH}
        cropHeight={SELECTED_ASSET_CONTAINER_HEIGHT}
        imageWidth={scaledWidth}
        imageHeight={scaledHeight}
        minScale={1}
        maxScale={3}
      >
        <Image
          style={{ width: scaledWidth, height: scaledHeight }}
          source={image}
          resizeMode="contain"
        />
      </ImageZoom>
    </View>
  );
};

export default SelectedLocalImage;
