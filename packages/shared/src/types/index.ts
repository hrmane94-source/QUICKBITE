import { z } from 'zod';
import {
  orderStatusSchema,
  verificationStatusSchema,
  paymentStatusSchema,
  tokenStatusSchema,
  paymentMethodSchema,
  collegeSchema,
  createCollegeSchema,
  updateCollegeSchema,
  canteenSchema,
  createCanteenSchema,
  updateCanteenSchema,
  studentSchema,
  createStudentSchema,
  updateStudentSchema,
  menuItemSchema,
  createMenuItemSchema,
  updateMenuItemSchema,
  orderItemSchema,
  orderSchema,
  createOrderItemInputSchema,
  createOrderInputSchema,
  tokenSchema,
  createTokenSchema,
  paymentSchema,
  createPaymentSchema,
} from '../schemas';

// =============================================================================
// Common Enums & Primitives
// =============================================================================

export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type VerificationStatus = z.infer<typeof verificationStatusSchema>;
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type TokenStatus = z.infer<typeof tokenStatusSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

// =============================================================================
// College Domain
// =============================================================================

export type College = z.infer<typeof collegeSchema>;
export type CreateCollegeInput = z.infer<typeof createCollegeSchema>;
export type UpdateCollegeInput = z.infer<typeof updateCollegeSchema>;

// =============================================================================
// Canteen Domain
// =============================================================================

export type Canteen = z.infer<typeof canteenSchema>;
export type CreateCanteenInput = z.infer<typeof createCanteenSchema>;
export type UpdateCanteenInput = z.infer<typeof updateCanteenSchema>;

// =============================================================================
// Student Domain
// =============================================================================

export type Student = z.infer<typeof studentSchema>;
export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

// =============================================================================
// Menu Item Domain
// =============================================================================

export type MenuItem = z.infer<typeof menuItemSchema>;
export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;

// =============================================================================
// Order Domain
// =============================================================================

export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type CreateOrderItemInput = z.infer<typeof createOrderItemInputSchema>;
export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

// =============================================================================
// Token Domain
// =============================================================================

export type Token = z.infer<typeof tokenSchema>;
export type CreateTokenInput = z.infer<typeof createTokenSchema>;

// =============================================================================
// Payment Domain
// =============================================================================

export type Payment = z.infer<typeof paymentSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
