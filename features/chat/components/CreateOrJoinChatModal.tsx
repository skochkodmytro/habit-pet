import { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Button, CommonModal, Input, ThemedText } from '@/components';
import { Colors } from '@/constants/Colors';
import { generateUniqueId } from '@/utils/numbers';

enum CreateMode {
  Create,
  Join,
}

type CreateOrJoinChatModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onCreateChat: (title: string, password: string) => Promise<unknown>;
  onJoinChat: (password: string) => Promise<unknown>;
};

const CreateOrJoinChatModal = ({
  isOpen,
  isLoading = false,
  onCreateChat,
  onJoinChat,
  ...rest
}: CreateOrJoinChatModalProps) => {
  const [createMode, setCreateMode] = useState<CreateMode>(CreateMode.Create);

  const [title, setTitle] = useState('');
  const [uniqPassword, setUniqPassword] = useState(() => generateUniqueId());

  const [password, setPassword] = useState('');

  const handleCreateChat = async () => {
    if (createMode === CreateMode.Create) {
      await onCreateChat(title, uniqPassword);

      setTitle('');
      setUniqPassword(generateUniqueId());
    } else {
      await onJoinChat(password);

      setPassword('');
    }
  };

  const isDisabled = useMemo(() => {
    if (createMode === CreateMode.Create) {
      return title.trim().length < 2;
    } else {
      return password.length < 8;
    }
  }, [createMode, password, title]);

  return (
    <CommonModal visible={isOpen} {...rest}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerAction}
          onPress={() => setCreateMode(CreateMode.Create)}
        >
          <ThemedText
            type="subtitle"
            style={
              createMode === CreateMode.Create && styles.headerActionTextActive
            }
          >
            Create
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerAction}
          onPress={() => setCreateMode(CreateMode.Join)}
        >
          <ThemedText
            type="subtitle"
            style={
              createMode === CreateMode.Join && styles.headerActionTextActive
            }
          >
            Join
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.formWrapper}>
        {createMode === CreateMode.Create ? (
          <Input
            value={title}
            label="Title"
            placeholder="Best chat name"
            onChangeText={setTitle}
          />
        ) : null}

        <Input
          value={createMode === CreateMode.Create ? uniqPassword : password}
          label="Chat password"
          placeholder="Password"
          keyboardType="numeric"
          editable={createMode !== CreateMode.Create}
          maxLength={8}
          onChangeText={(val) => setPassword(val.trim())}
        />

        <Button
          disabled={isDisabled}
          loading={isLoading}
          onPress={handleCreateChat}
        >
          {createMode === CreateMode.Create ? 'Create' : 'Join'} chat
        </Button>
      </View>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAction: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerActionTextActive: {
    color: Colors.dark.primary,
  },
  formWrapper: {
    gap: 12,
  },
});

export default CreateOrJoinChatModal;
