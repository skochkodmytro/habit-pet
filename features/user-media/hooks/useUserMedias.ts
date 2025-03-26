import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';

import { useBoolean } from '@/hooks';

const LIMIT_COUNT = 30;

const useUserMedias = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [medias, setMedias] = useState<MediaLibrary.Asset[]>([]);
  const [afterMediaId, setAfterMediaId] = useState<string | null>(null);
  const { value: isFinishedLoad, setTrue: finishLoad } = useBoolean(false);
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(true);

  useEffect(() => {
    fetchMedias(true);
  }, []);

  const fetchMedias = async (isFirstLoading: boolean = false) => {
    if (isFinishedLoad) return;
    if (!isFirstLoading && isLoading) return;

    if (permissionResponse?.status !== 'granted') {
      await requestPermission();
    }

    startLoading();

    const { assets, hasNextPage, endCursor } =
      await MediaLibrary.getAssetsAsync({
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
        first: LIMIT_COUNT,
        after: afterMediaId ?? undefined,
      }).finally(finishLoading);

    setAfterMediaId(endCursor);
    if (!hasNextPage) finishLoad();

    setMedias((prev) => [...prev, ...assets]);
  };

  const pickDocument = async (type: 'audio' | 'pdf') => {
    const requestType = type === 'audio' ? 'audio/*' : 'application/pdf';
    const { assets } = await DocumentPicker.getDocumentAsync({
      type: requestType,
    });

    if (assets && assets.length > 0) {
      const [asset] = assets;
    }
  };

  return {
    medias,
    isLoading,
    fetchMore: fetchMedias,
    pickDocument,
  };
};

export default useUserMedias;
