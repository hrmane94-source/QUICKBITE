import { z } from 'zod';
import { uuidSchema } from './common';

export const menuItemSchema = z.object({
  id: uuidSchema,
  canteenId: uuidSchema,
  name: z
    .string()
    .min(1, 'Item name is required')
    .max(150, 'Item name cannot exceed 150 characters'),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  category: z
    .string()
    .min(1, 'Category is required')
    .max(50, 'Category cannot exceed 50 characters'),
  pricePaise: z
    .number()
    .int('Price must be an integer in paise')
    .nonnegative('Price cannot be negative'),
  isAvailable: z.boolean().default(true),
  prepTimeMinutes: z
    .number()
    .int('Preparation time must be an integer')
    .nonnegative('Preparation time cannot be negative')
    .default(10),
  imageUrl: z
    .string()
    .url('Must be a valid URL string')
    .optional(),
});

export const createMenuItemSchema = menuItemSchema.omit({
  id: true,
});

export const updateMenuItemSchema = createMenuItemSchema.partial();
