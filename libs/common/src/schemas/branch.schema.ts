import { z } from '@hono/zod-openapi';

export const branchParamSchema = z.object({
  branchId: z.string(),
});

export const branchSchema = z
  .object({
    _id: z.string(),
    name: z
      .string()
      .regex(/^[a-z0-9_-]+$/i, 'Name can only contain alphanumeric characters, underscores, and hyphens')
      .max(64),
    title: z.string().max(64),
    _companyId: z.string(),
    description: z.string().max(256),
    isActive: z.boolean().default(true),
    isArchived: z.boolean().default(false),
    phoneNumber: z.string().max(12),
    email: z.string().email().max(128),
    address: z.object({
      addressLine1: z.string().max(128),
      addressLine2: z.string().max(128).optional(),
      city: z.string().max(32),
      postCode: z.string().max(16),
      country: z.string().max(32),
    }),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
  })
  .openapi('BranchSchema');

export const branchListQuerySchema = z.object({
  search: z.string().optional(),
  isActive: z
    .string()
    .transform(val => val === 'true')
    .optional(),
  companyId: z.string(),
  sortField: z.enum(['name', 'title', 'createdAt', 'updatedAt', 'isActive']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z
    .string()
    .transform(val => Number(val))
    .optional()
    .default('1'),
  limit: z
    .string()
    .transform(val => Number(val))
    .optional()
    .default('10'),
});

export const branchCreateSchema = branchSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  __v: true,
});

export const branchUpdateSchema = branchCreateSchema.partial();

export type BranchType = z.infer<typeof branchSchema>;
export type BranchListQueryType = z.infer<typeof branchListQuerySchema>;
export type BranchListResultType = {
  items: BranchType[];
  total: number;
  page: number;
  limit: number;
};
export type BranchCreateType = z.infer<typeof branchCreateSchema>;
export type BranchUpdateType = z.infer<typeof branchUpdateSchema>;
