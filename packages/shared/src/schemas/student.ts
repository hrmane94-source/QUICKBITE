import { z } from 'zod';
import { uuidSchema, verificationStatusSchema } from './common';

export const studentSchema = z.object({
  id: uuidSchema,
  authUserId: z
    .string()
    .min(1, 'Authentication user ID is required'),
  collegeId: uuidSchema,
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(100, 'Display name cannot exceed 100 characters'),
  email: z
    .string()
    .email('Must be a valid email address')
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian mobile number')
    .optional(),
  verificationStatus: verificationStatusSchema.default('not_started'),
});

export const createStudentSchema = studentSchema.omit({
  id: true,
});

export const updateStudentSchema = createStudentSchema.partial();
