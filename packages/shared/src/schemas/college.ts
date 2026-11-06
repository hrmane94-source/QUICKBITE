import { z } from 'zod';
import { uuidSchema } from './common';

export const collegeSchema = z.object({
  id: uuidSchema,
  name: z
    .string()
    .min(2, 'College name must be at least 2 characters')
    .max(200, 'College name cannot exceed 200 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug cannot exceed 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must consist of lowercase alphanumeric characters and hyphens'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City cannot exceed 100 characters'),
  state: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State cannot exceed 100 characters')
    .default('Maharashtra'),
  isActive: z.boolean().default(true),
});

export const createCollegeSchema = collegeSchema.omit({
  id: true,
});

export const updateCollegeSchema = createCollegeSchema.partial();
