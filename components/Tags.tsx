import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '@/constants/Colors';

import { ThemedText } from './ThemedText';

export type Tag = {
  label: string;
  value: any;
};

type TagsProps = {
  tags: Tag[];
  value?: (string | number)[];
  label?: string;
  errorMessage?: string;
  onPressTag?: (value: string | number) => void;
};

const Tags = ({ tags, value, label, errorMessage, onPressTag }: TagsProps) => {
  return (
    <View>
      {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}

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

      {errorMessage ? (
        <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
      ) : null}
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
  errorText: {
    fontSize: 12,
    color: '#FF4D4F',
    marginTop: 4,
  },
});

export default Tags;
