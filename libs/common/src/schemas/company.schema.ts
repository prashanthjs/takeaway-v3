import { z } from '@hono/zod-openapi';

export const companyParamSchema = z.object({
  companyId: z.string(),
});

export const companySchema = z
  .object({
    _id: z.string(),
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(2, 'Name must be at least 2 characters long')
      .max(64, 'Name must be at most 64 characters long')
      .regex(/^[a-z0-9_-]+$/, 'Name can only contain alphanumeric characters, underscores, and hyphens'),
    title: z
      .string()
      .min(2, 'Title must be at least 2 characters long')
      .max(64, 'Title must be at most 64 characters long'),
    description: z.string().optional(),
    isActive: z.boolean(),
    isArchived: z.boolean().optional().default(false),
    logoUrl: z.string().optional(),
    address: z
      .object({
        addressLine1: z.string(),
        addressLine2: z.string().optional(),
        city: z.string(),
        postCode: z.string(),
        country: z.string(),
      })
      .optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    _config: z
      .object({
        systemPrompt: z.string().optional(),
        aiKey: z.string().optional(),
        whatsapp: z
          .object({
            senderId: z.string().optional(),
            accessToken: z.string().optional(),
            verifyToken: z.string().optional(),
            apiVersion: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    __v: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi('CompanySchema');

export const companyListQuerySchema = z.object({
  search: z.string().optional(),
  isActive: z.union([z.string(), z.boolean()]).pipe(z.coerce.boolean()).optional(),
  sortField: z.enum(['name', 'createdAt', 'updatedAt', 'isActive']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.union([z.string(), z.number()]).pipe(z.coerce.number()).optional().default(1),
  limit: z.union([z.string(), z.number()]).pipe(z.coerce.number()).optional().default(10),
});

export const companyListResultSchema = z.object({
  data: z.array(companySchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }),
});

export const companyCreateSchema = companySchema
  .omit({
    _id: true,
    __v: true,
    createdAt: true,
    updatedAt: true,
    isArchived: true,
  })
  .openapi('CompanyCreateSchema');

export const companyUpdateSchema = companySchema
  .omit({
    createdAt: true,
    updatedAt: true,
    isArchived: true,
  })
  .openapi('CompanyUpdateSchema');

export type CompanyType = z.infer<typeof companySchema>;
export type CompanyListQueryType = z.infer<typeof companyListQuerySchema>;
export type CompanyListResultType = z.infer<typeof companyListResultSchema>;
export type CompanyCreateType = z.infer<typeof companyCreateSchema>;
export type CompanyUpdateType = z.infer<typeof companyUpdateSchema>;
