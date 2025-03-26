import { Asset as MediaAsset } from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';

type CommonAssetType = 'media' | 'pdf' | 'audio';

type DocumentType = DocumentPicker.DocumentPickerAsset & {
  id: string;
  type: CommonAssetType;
};

type GalleryAsset = MediaAsset & {
  type: CommonAssetType;
};

export type CommonAsset = DocumentType | GalleryAsset;
