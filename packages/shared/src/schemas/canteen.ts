import { z } from 'zod';
import { uuidSchema } from './common';

export const canteenSchema = z.object({
  id: uuidSchema,
  collegeId: uuidSchema,
  name: z
    .string()
    .min(2, 'Canteen name must be at least 2 characters')
    .max(100, 'Canteen name cannot exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  isActive: z.boolean().default(true),
});

export const createCanteenSchema = canteenSchema.omit({
  id: true,
});

export const updateCanteenSchema = createCanteenSchema.partial();
