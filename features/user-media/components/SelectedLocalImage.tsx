import { useMemo } from 'react';
import { Image, View } from 'react-native';
import { Asset } from 'expo-media-library';
import { ImageResult } from 'expo-image-manipulator';
import ImageZoom from 'react-native-image-pan-zoom';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/constants/Device';

type SelectedLocalImageProps = {
  image: Asset | ImageResult;
  onChangeImage: (image: ImageResult) => void;
};

const SelectedLocalImage = ({
  image,
  onChangeImage,
}: SelectedLocalImageProps) => {
  // const context = useImageManipulator(image.uri);

  // const rotate90andFlip = async () => {
  //   context.rotate(90);
  //   const image = await context.renderAsync();
  //   const result = await image.saveAsync({
  //     format: SaveFormat.PNG,
  //   });

  //   onChangeImage(result);
  // };

  const { scaledHeight, scaledWidth } = useMemo(() => {
    const imageAspectRatio = image.width / image.height;
    const containerAspectRatio = DEVICE_WIDTH / (DEVICE_HEIGHT / 3);

    let scaledWidth, scaledHeight;

    if (imageAspectRatio > containerAspectRatio) {
      scaledWidth = DEVICE_WIDTH;
      scaledHeight = DEVICE_WIDTH / imageAspectRatio;
    } else {
      scaledHeight = DEVICE_HEIGHT / 3;
      scaledWidth = (DEVICE_HEIGHT / 3) * imageAspectRatio;
    }

    return { scaledWidth, scaledHeight };
  }, [image]);

  return (
    <View>
      {/* @ts-ignore */}
      <ImageZoom
        cropWidth={DEVICE_WIDTH}
        cropHeight={DEVICE_HEIGHT / 3}
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
