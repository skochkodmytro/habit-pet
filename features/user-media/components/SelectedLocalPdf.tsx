import { View, StyleSheet, TouchableOpacity } from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { ThemedText } from '@/components';
import { useBoolean } from '@/hooks';

import {
  SELECTED_ASSET_CONTAINER_HEIGHT,
  SELECTED_ASSET_CONTAINER_WIDTH,
} from '../constants/CreatePostLayer';
import PdfViewerModal from './PdfViewerModal';
import { DocumentType } from '../types';

type SelectedLocalPdfProps = {
  pdfFile: DocumentType;
};

const SelectedLocalPdf = ({ pdfFile }: SelectedLocalPdfProps) => {
  const {
    value: isOpenPdfModal,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <FontAwesome6 name="file-pdf" size={42} color="black" />
        <ThemedText style={styles.buttonText} type="subtitle">
          Open file
        </ThemedText>
      </TouchableOpacity>

      <PdfViewerModal
        visible={isOpenPdfModal}
        pdfFile={pdfFile}
        onClose={closeModal}
      />
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
  button: {
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default SelectedLocalPdf;
