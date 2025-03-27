import { Asset as MediaAsset, MediaTypeValue } from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';

type CommonAssetType = MediaTypeValue | 'pdf';

export type DocumentType = DocumentPicker.DocumentPickerAsset & {
  id: string;
  mediaType: CommonAssetType;
};

export type CommonAsset = DocumentType | MediaAsset;
