import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Asset } from 'expo-media-library';

import {
  SELECTED_ASSET_CONTAINER_HEIGHT,
  SELECTED_ASSET_CONTAINER_WIDTH,
} from '../constants/CreatePostLayer';
import { useGetAssetInfo } from '../hooks';

type SelectedLocalVideoProps = {
  video: Asset;
};

export const SelectedLocalVideo = ({ video }: SelectedLocalVideoProps) => {
  const videoInfo = useGetAssetInfo(video);

  const player = useVideoPlayer(videoInfo?.localUri ?? null, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View>
      <VideoView style={styles.video} player={player} contentFit="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: SELECTED_ASSET_CONTAINER_WIDTH,
    height: SELECTED_ASSET_CONTAINER_HEIGHT,
  },
});

export default SelectedLocalVideo;
