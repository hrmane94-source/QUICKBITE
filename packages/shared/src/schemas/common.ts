import { z } from 'zod';

// =============================================================================
// Primitive Schemas
// =============================================================================

export const uuidSchema = z
  .string()
  .uuid({ message: 'Must be a valid UUID v4 string' });

export const isoTimestampSchema = z
  .string()
  .datetime({ message: 'Must be a valid ISO 8601 timestamp string' });

export const currencySchema = z
  .string()
  .min(3)
  .max(3)
  .default('INR');

// =============================================================================
// Domain Enums
// =============================================================================

export const orderStatusSchema = z.enum([
  'placed',
  'accepted',
  'preparing',
  'ready',
  'completed',
  'cancelled',
  'rejected',
]);

export const verificationStatusSchema = z.enum([
  'not_started',
  'pending',
  'verified',
  'rejected',
  'manual_review',
]);

export const paymentStatusSchema = z.enum([
  'pending',
  'paid',
  'failed',
  'refunded',
]);

export const tokenStatusSchema = z.enum([
  'active',
  'served',
  'cancelled',
]);

export const paymentMethodSchema = z.enum([
  'upi',
  'cash',
  'other',
]);
