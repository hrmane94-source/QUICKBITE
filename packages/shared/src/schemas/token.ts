import { z } from 'zod';
import { uuidSchema, isoTimestampSchema, tokenStatusSchema } from './common';

export const tokenSchema = z.object({
  id: uuidSchema,
  orderId: uuidSchema,
  tokenNumber: z
    .string()
    .min(1, 'Token number is required')
    .max(20, 'Token number cannot exceed 20 characters'),
  status: tokenStatusSchema.default('active'),
  issuedAt: isoTimestampSchema,
});

export const createTokenSchema = tokenSchema.omit({
  id: true,
});
