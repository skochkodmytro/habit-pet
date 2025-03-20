import * as yup from 'yup';
import { CreateOrUpdateHabitRequestDto, DaysEnum } from '../types';

export const CreateOrUpdateHabitSchema: yup.ObjectSchema<CreateOrUpdateHabitRequestDto> =
  yup.object({
    uid: yup.string().nullable(),
    name: yup
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .required('Name is required'),
    description: yup
      .string()
      .max(200, 'Description cannot exceed 200 characters')
      .defined(),
    repeatDays: yup
      .array()
      .of(
        yup
          .mixed<DaysEnum>()
          .oneOf(Object.values(DaysEnum), 'Invalid day')
          .required()
      )
      .min(1, 'At least one repeat day is required')
      .required('Repeat days are required'),
  });
