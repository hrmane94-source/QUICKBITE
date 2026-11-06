import { z } from 'zod';
import {
  uuidSchema,
  currencySchema,
  paymentStatusSchema,
  paymentMethodSchema,
} from './common';

export const paymentSchema = z.object({
  id: uuidSchema,
  orderId: uuidSchema,
  amountPaise: z
    .number()
    .int('Payment amount must be an integer in paise')
    .positive('Payment amount must be positive'),
  currency: currencySchema.default('INR'),
  status: paymentStatusSchema.default('pending'),
  method: paymentMethodSchema.default('upi'),
  providerReference: z
    .string()
    .max(100, 'Provider reference cannot exceed 100 characters')
    .optional(),
});

export const createPaymentSchema = paymentSchema.omit({
  id: true,
});
