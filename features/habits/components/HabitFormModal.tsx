import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, CommonModal, Input, ThemedText, Tags } from '@/components';

import { Habit, DaysEnum, CreateOrUpdateHabitRequestDto } from '../types';
import { DAYS_OPTIONS } from '../constants/days';
import { CreateOrUpdateHabitSchema } from '../constants/schemas';

type HabitFormModalProps = {
  habit: Partial<Habit> | null;
  isLoading?: boolean;
  onClose: () => void;
  onSave: (habit: CreateOrUpdateHabitRequestDto) => Promise<void>;
};

const HabitFormModal = ({
  habit,
  isLoading = false,
  onClose,
  onSave,
}: HabitFormModalProps) => {
  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<CreateOrUpdateHabitRequestDto>({
      values: {
        uid: habit?.uid,
        name: habit?.name ?? '',
        description: habit?.description ?? '',
        repeatDays: habit?.repeatDays ?? [],
      },
      resolver: yupResolver(CreateOrUpdateHabitSchema),
    });

  useEffect(() => {
    if (!!habit) reset();
  }, [habit]);

  const onPressDay = (day: string | number) => {
    const repeatDays = getValues().repeatDays;
    const findIndex = repeatDays.findIndex((d) => d === day);

    if (findIndex === -1) {
      return setValue('repeatDays', [...repeatDays, day as DaysEnum], {
        shouldValidate: true,
      });
    }

    repeatDays.splice(findIndex, 1);
    setValue('repeatDays', repeatDays, {
      shouldValidate: true,
    });
  };

  const title = habit?.uid ? 'Edit' : 'Create';

  return (
    <CommonModal visible={!!habit} onClose={onClose}>
      <ThemedText type="subtitle">{title} habit</ThemedText>

      <View style={styles.form}>
        <Controller
          name="name"
          control={control}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
            formState: { isSubmitted },
          }) => (
            <Input
              value={value}
              placeholder="Name"
              errorMessage={isSubmitted ? error?.message : undefined}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
            formState: { isSubmitted },
          }) => (
            <Input
              value={value}
              placeholder="Description"
              textarea
              errorMessage={isSubmitted ? error?.message : undefined}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="repeatDays"
          control={control}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
            formState: { isSubmitted },
          }) => (
            <Tags
              label="Select frequency"
              tags={DAYS_OPTIONS}
              value={value}
              errorMessage={isSubmitted ? error?.message : undefined}
              onPressTag={onPressDay}
            />
          )}
        />
      </View>

      <Button loading={isLoading} onPress={handleSubmit(onSave)}>
        {title}
      </Button>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginVertical: 10,
  },
});

export default HabitFormModal;
