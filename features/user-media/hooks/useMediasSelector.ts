import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Asset } from 'expo-media-library';

import { useBoolean } from '@/hooks';

const useMediasSelector = (initialSingleAsset: Asset | null) => {
  const isAlreadySetInitialAssetRef = useRef(false);
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [selectedSingleAsset, setSelectedSingleAsset] = useState<Asset | null>(
    null
  );
  const { value: isMultipleMode, toggle: toggleMultipleMode } =
    useBoolean(false);

  useEffect(() => {
    if (!initialSingleAsset) return;
    if (isAlreadySetInitialAssetRef.current) return;

    if (initialSingleAsset) setSelectedSingleAsset(initialSingleAsset);
    isAlreadySetInitialAssetRef.current = true;
  }, [initialSingleAsset]);

  useEffect(() => {
    if (selectedAssets.length > 0) {
      setSelectedSingleAsset(selectedAssets[selectedAssets.length - 1]);
    }
  }, [selectedAssets]);

  const toggleMedia = useCallback(
    (media: Asset) => {
      const findMediaIndex = selectedAssets.findIndex(
        (asset) => asset.id === media.id
      );

      if (findMediaIndex === -1)
        return setSelectedAssets((prev) => [...prev, media]);

      const copiedAssets = [...selectedAssets];
      copiedAssets.splice(findMediaIndex, 1);
      setSelectedAssets(copiedAssets);
    },
    [selectedAssets]
  );

  // const pickDocument = async (type: 'audio' | 'pdf') => {
  //   const requestType = type === 'audio' ? 'audio/*' : 'application/pdf';
  //   const { assets } = await DocumentPicker.getDocumentAsync({
  //     type: requestType,
  //   });

  //   if (assets && assets.length > 0) {
  //     const [asset] = assets;
  //   }
  // };

  const lastSelectedAsset = useMemo(() => {
    if (isMultipleMode) {
      return selectedAssets.length > 0
        ? selectedAssets[selectedAssets.length - 1]
        : selectedSingleAsset;
    }

    return selectedSingleAsset;
  }, [selectedAssets, isMultipleMode, selectedSingleAsset]);

  const isDisableNextStep = useMemo(() => {
    return isMultipleMode && selectedAssets.length === 0;
  }, [isMultipleMode, selectedAssets, selectedSingleAsset]);

  return {
    lastSelectedAsset,
    selectedAssets,
    selectedSingleAsset,
    isMultipleMode,
    isDisableNextStep,
    toggleMedia,
    toggleMultipleMode,
    setSelectedSingleAsset,
    // pickDocument,
  };
};

export default useMediasSelector;
