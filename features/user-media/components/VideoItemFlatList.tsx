import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Asset } from 'expo-media-library';

import { useGetAssetInfo } from '../hooks';

type VideoItemFlatListProps = {
  isActive: boolean;
  video: Asset;
};

const VideoItemFlatList = ({ video, isActive }: VideoItemFlatListProps) => {
  const videoInfo = useGetAssetInfo(video);

  const player = useVideoPlayer(videoInfo?.localUri ?? null, (player) => {
    player.loop = true;

    if (isActive) {
      player.play();
    }
  });

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive]);

  return (
    <View>
      <VideoView style={styles.video} player={player} contentFit="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
  },
});

export default VideoItemFlatList;
