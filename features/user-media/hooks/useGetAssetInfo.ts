import { useEffect, useState } from 'react';
import { Asset } from 'expo-media-library';
import * as MediaLibrary from 'expo-media-library';

const useGetAssetInfo = (video: Asset) => {
  const [assetInfo, setAssetInfo] = useState<MediaLibrary.AssetInfo | null>(
    null
  );

  useEffect(() => {
    getAssetsInfo();
  }, [video]);

  const getAssetsInfo = async () => {
    const info = await MediaLibrary.getAssetInfoAsync(video.id);

    setAssetInfo(info);
  };

  return assetInfo;
};

export default useGetAssetInfo;
