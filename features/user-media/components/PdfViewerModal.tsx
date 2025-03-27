import { Modal, ModalProps, View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

import { Header } from '@/components';

import { DocumentType } from '../types';

type PdfViewerModalProps = ModalProps & {
  pdfFile?: DocumentType;
  onClose: () => void;
};

const PdfViewerModal = ({ pdfFile, onClose, ...rest }: PdfViewerModalProps) => {
  const source = { uri: pdfFile?.uri };

  return (
    <Modal
      style={styles.modal}
      transparent={false}
      animationType="slide"
      {...rest}
    >
      <Header title="Close" onGoBack={onClose} />
      <View style={styles.wrapper}>
        <Pdf source={source} style={{ flex: 1 }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PdfViewerModal;
