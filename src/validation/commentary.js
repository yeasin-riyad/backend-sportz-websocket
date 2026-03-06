import { z } from 'zod';

// ==================== SCHEMAS ====================

/**
 * Query schema for listing commentary with optional pagination
 */
export const listCommentaryQuerySchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .optional(),
});

/**
 * Schema for creating a new commentary entry
 */
export const createCommentarySchema = z.object({
  matchId: z.coerce.number().int().positive().optional(), // This will be validated in the route params
  minute: z.coerce.number().int().nonnegative(),
  sequence: z.coerce.number().int(),
  period: z.string(),
  eventType: z.string(),
  actor: z.string().optional(),
  team: z.string().optional(),
  message: z.string().min(1, 'Message cannot be empty'),
  metadata: z.record(z.string(), z.any()).optional(),
  tags: z.array(z.string()).optional(),
});