import { ScrollView, StyleSheet, View } from 'react-native';

import { CommonModal, ThemedText } from '@/components';
import { DEVICE_HEIGHT } from '@/constants/Device';

import { DailyPlanItem } from '../types';

type DailyPlanModalProps = {
  visible: boolean;
  dailyPlanItems: DailyPlanItem[];
  onClose: () => void;
};

const DailyPlanModal = ({
  dailyPlanItems,
  onClose,
  ...modalProps
}: DailyPlanModalProps) => {
  return (
    <CommonModal onClose={onClose} {...modalProps}>
      <ThemedText type="title" style={{ marginBottom: 20 }}>
        Daily plan
      </ThemedText>
      <ScrollView style={styles.list}>
        <View style={styles.listWrapper}>
          {dailyPlanItems.map((item, index) => (
            <View key={index}>
              <View style={styles.header}>
                <ThemedText type="subtitle" style={styles.title}>
                  {item.title}
                </ThemedText>
                <ThemedText>{item.time}</ThemedText>
              </View>
              <ThemedText>{item.description}</ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 2,
    maxHeight: DEVICE_HEIGHT / 2,
  },
  listWrapper: {
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    flex: 1,
  },
});

export default DailyPlanModal;
