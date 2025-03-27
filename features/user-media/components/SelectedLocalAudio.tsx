import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  SELECTED_ASSET_CONTAINER_HEIGHT,
  SELECTED_ASSET_CONTAINER_WIDTH,
} from '../constants/CreatePostLayer';
import { DocumentType } from '../types';

type SelectedLocalAudioProps = {
  audio: DocumentType;
};

const SelectedLocalAudio = ({ audio }: SelectedLocalAudioProps) => {
  const player = useAudioPlayer(audio);
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    player.play();
  }, []);

  const togglePlay = () => {
    return playerStatus.playing ? player.pause() : player.play();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity hitSlop={12} onPress={togglePlay}>
        {!playerStatus.playing ? (
          <FontAwesome name="play" size={32} color="black" />
        ) : (
          <FontAwesome name="pause" size={32} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SELECTED_ASSET_CONTAINER_WIDTH,
    height: SELECTED_ASSET_CONTAINER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectedLocalAudio;
