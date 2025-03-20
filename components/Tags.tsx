import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '@/constants/Colors';

import { ThemedText } from './ThemedText';

type Tag = {
  label: string;
  value: string | number;
};

type TagsProps = {
  tags: Tag[];
  value?: (string | number)[];
  label?: string;
  onPressTag?: (value: string | number) => void;
};

const Tags = ({ tags, value, label, onPressTag }: TagsProps) => {
  return (
    <View>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}

      <View style={styles.container}>
        {tags.map((tag) => {
          const isSelected = value?.includes(tag.value);

          return (
            <TouchableOpacity
              key={tag.value}
              style={[styles.tag, isSelected && styles.selectedTag]}
              disabled={!onPressTag}
              onPress={() => onPressTag?.(tag.value)}
            >
              <ThemedText
                style={[styles.tagText, isSelected && styles.selectedTagText]}
              >
                {tag.label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    borderRadius: 8,
    borderWidth: 0.3,
    borderColor: 'gray',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  selectedTag: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  selectedTagText: {
    color: Colors.dark.white,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tags;
