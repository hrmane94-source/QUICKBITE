import { z } from 'zod';
import { uuidSchema, isoTimestampSchema, orderStatusSchema } from './common';

// =============================================================================
// Order Item Schema
// Cross-field refinement: totalPricePaise must equal quantity × unitPricePaise.
// NOTE: Detailed checkout breakdown fields (tax, convenience fee, packaging fee,
// discounts) are intentionally omitted at this stage. These will be introduced
// during payment workflow implementation (Milestone 11/12).
// =============================================================================

export const orderItemSchema = z
  .object({
    itemId: uuidSchema,
    name: z
      .string()
      .min(1, 'Item name snapshot is required'),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .positive('Quantity must be at least 1'),
    unitPricePaise: z
      .number()
      .int('Unit price snapshot must be an integer in paise')
      .nonnegative('Unit price cannot be negative'),
    totalPricePaise: z
      .number()
      .int('Total price must be an integer in paise')
      .nonnegative('Total price cannot be negative'),
    customization: z
      .string()
      .max(200, 'Customization note cannot exceed 200 characters')
      .optional(),
  })
  .refine(
    (item) => item.totalPricePaise === item.quantity * item.unitPricePaise,
    {
      message: 'totalPricePaise must equal quantity multiplied by unitPricePaise',
      path: ['totalPricePaise'],
    }
  );

// =============================================================================
// Order Schema
// Cross-field refinement: subtotalPaise must equal the sum of all order item
// totalPricePaise values.
// NOTE: totalPaise is preserved alongside subtotalPaise to accommodate future
// charge breakdowns (fees, taxes, discounts) during payment implementation.
// =============================================================================

export const orderSchema = z
  .object({
    id: uuidSchema,
    studentId: uuidSchema,
    canteenId: uuidSchema,
    items: z
      .array(orderItemSchema)
      .min(1, 'Order must contain at least one item'),
    subtotalPaise: z
      .number()
      .int('Subtotal must be an integer in paise')
      .nonnegative('Subtotal cannot be negative'),
    totalPaise: z
      .number()
      .int('Total must be an integer in paise')
      .nonnegative('Total cannot be negative'),
    status: orderStatusSchema.default('placed'),
    createdAt: isoTimestampSchema,
    updatedAt: isoTimestampSchema,
  })
  .refine(
    (order) =>
      order.subtotalPaise ===
      order.items.reduce((sum, item) => sum + item.totalPricePaise, 0),
    {
      message: 'subtotalPaise must equal the sum of all item totalPricePaise values',
      path: ['subtotalPaise'],
    }
  );

export const createOrderItemInputSchema = orderItemSchema.omit({
  totalPricePaise: true,
});

export const createOrderInputSchema = z.object({
  studentId: uuidSchema,
  canteenId: uuidSchema,
  items: z
    .array(createOrderItemInputSchema)
    .min(1, 'Order must contain at least one item'),
});
