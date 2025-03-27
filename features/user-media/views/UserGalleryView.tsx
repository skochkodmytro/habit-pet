import { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Asset } from 'expo-media-library';
import { useRouter } from 'expo-router';

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Button, Header, ThemedText } from '@/components';
import { DEVICE_WIDTH } from '@/constants/Device';
import { Colors } from '@/constants/Colors';

import { useMediasSelector, useUserMedias } from '../hooks';
import {
  SelectedLocalAudio,
  SelectedLocalImage,
  SelectedLocalPdf,
  SelectedLocalVideo,
} from '../components';
import { useCreatePostStore } from '../store';
import { CommonAsset, DocumentType } from '../types';

const IMAGE_SIZE = (DEVICE_WIDTH - 8) / 3; // 8 is gap and padding horizontal

const UserGalleryView = () => {
  const router = useRouter();
  const { medias, pickDocument, fetchMore } = useUserMedias();
  const {
    selectedAssets,
    lastSelectedAsset,
    selectedSingleAsset,
    isMultipleMode,
    isDisableNextStep,
    toggleMultipleMode,
    setSelectedSingleAsset,
    toggleMedia,
  } = useMediasSelector(medias[0] as Asset);
  const { setAssets } = useCreatePostStore();

  const fetchMoreMedias = useCallback(() => fetchMore(), [fetchMore]);

  const navigateToNextStep = () => {
    setAssets(
      isMultipleMode ? selectedAssets : (selectedSingleAsset as CommonAsset)
    );
    router.push('/(tabs)/(gallery)/edit-selected-medias');
  };

  const renderMedia: ListRenderItem<CommonAsset> = useCallback(
    ({ item }) => {
      const selectedIndex = selectedAssets.findIndex(
        (asset) => asset.id === item.id
      );

      return (
        <TouchableOpacity
          style={styles.mediaContainer}
          onPress={() =>
            isMultipleMode ? toggleMedia(item) : setSelectedSingleAsset(item)
          }
        >
          {item.mediaType === 'photo' || item.mediaType === 'video' ? (
            <Image source={{ uri: item.uri }} style={styles.image} />
          ) : null}

          {item.mediaType === 'audio' ? (
            <View>
              <FontAwesome name="file-audio-o" size={24} color="black" />
            </View>
          ) : null}

          {item.mediaType === 'pdf' ? (
            <View>
              <FontAwesome6 name="file-pdf" size={24} color="black" />
            </View>
          ) : null}

          {item.mediaType === 'video' ? (
            <View style={styles.videoIconWrapper}>
              <Feather name="video" size={14} color="white" />
            </View>
          ) : null}

          {selectedIndex !== -1 && isMultipleMode ? (
            <View style={styles.selectedBadge}>
              <ThemedText style={styles.selectedBadgeText}>
                {selectedIndex + 1}
              </ThemedText>
            </View>
          ) : null}
        </TouchableOpacity>
      );
    },
    [isMultipleMode, toggleMedia]
  );

  const renderNextButton = useMemo(() => {
    return (
      <Button disabled={isDisableNextStep} onPress={navigateToNextStep}>
        Next
      </Button>
    );
  }, [isDisableNextStep, navigateToNextStep]);

  const keyExtractor = useCallback((item: CommonAsset) => item.id, []);

  return (
    <View style={styles.screen}>
      <Header
        title="Medias"
        enableGoBack={false}
        renderRightBlock={renderNextButton}
      />

      {lastSelectedAsset?.mediaType === 'photo' ? (
        <SelectedLocalImage
          image={lastSelectedAsset as Asset}
          onChangeImage={() => {}}
          //   onChangeImage={handleEditLastSelectedAssets}
        />
      ) : null}

      {lastSelectedAsset?.mediaType === 'video' ? (
        <SelectedLocalVideo video={lastSelectedAsset as Asset} />
      ) : null}

      {lastSelectedAsset?.mediaType === 'audio' ? (
        <SelectedLocalAudio audio={lastSelectedAsset as DocumentType} />
      ) : null}

      {lastSelectedAsset?.mediaType === 'pdf' ? (
        <SelectedLocalPdf pdfFile={lastSelectedAsset} />
      ) : null}

      <View style={{ minHeight: 35 }}>
        <View style={[styles.actionsWrapper, styles.actionsLeftWrapper]}>
          <TouchableOpacity
            hitSlop={10}
            style={styles.actionItem}
            onPress={() => pickDocument('audio')}
          >
            <MaterialIcons name="audiotrack" size={18} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={10}
            style={styles.actionItem}
            onPress={() => pickDocument('pdf')}
          >
            <AntDesign name="pdffile1" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.actionsWrapper}>
          <TouchableOpacity
            hitSlop={10}
            style={styles.actionItem}
            onPress={toggleMultipleMode}
          >
            <MaterialCommunityIcons name="layers" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={medias}
        keyExtractor={keyExtractor}
        renderItem={renderMedia}
        numColumns={3}
        columnWrapperStyle={{ gap: 2, paddingHorizontal: 2 }}
        contentContainerStyle={styles.list}
        onEndReached={fetchMoreMedias}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flexGrow: 1,
    gap: 2,
  },
  mediaContainer: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoIconWrapper: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  image: {
    flex: 1,
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  selectedBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.dark.primary,
  },
  selectedBadgeText: {
    fontSize: 14,
    lineHeight: 20,
    color: 'white',
  },
  actionsWrapper: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionsLeftWrapper: {
    left: 5,
  },
  actionItem: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserGalleryView;
