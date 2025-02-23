import { HTTPException } from 'hono/http-exception';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';

import {
  branchCreateSchema,
  branchListQuerySchema,
  branchParamSchema,
  branchSchema,
  branchUpdateSchema,
} from '@takeaway/common';

import {
  createBranch,
  deleteBranch,
  getBranch,
  getBranchCount,
  getBranchList,
  updateBranch,
} from '@api/services/branch.service';

export const branchRoute = new OpenAPIHono();

branchRoute.openapi(
  createRoute({
    method: 'get',
    path: '/',
    request: {
      query: branchListQuerySchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: branchSchema.array(),
          },
        },
        description: 'Branch list',
      },
    },
  }),
  async c => {
    const query = c.req.valid('query');
    const count = await getBranchCount({ query });
    const branchList = await getBranchList({
      query,
    });

    return c.json({
      items: branchList,
      total: count,
      page: query.page,
      limit: query.limit,
    });
  },
);

branchRoute.openapi(
  createRoute({
    method: 'post',
    path: '/',
    request: {
      body: {
        content: {
          'application/json': {
            schema: branchCreateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: branchSchema,
          },
        },
        description: 'Branch created',
      },
    },
  }),
  async c => {
    const data = await c.req.valid('json');
    const branch = await createBranch({ data });
    return c.json(branch, 201);
  },
);

branchRoute.openapi(
  createRoute({
    method: 'get',
    path: '/:branchId',
    request: {
      params: branchParamSchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: branchSchema,
          },
        },
        description: 'Branch details',
      },
    },
  }),
  async c => {
    const { branchId } = c.req.valid('param');
    const branch = await getBranch({ branchId });
    if (!branch) {
      throw new HTTPException(404, { message: 'Branch not found' });
    }
    return c.json(branch);
  },
);

branchRoute.openapi(
  createRoute({
    method: 'put',
    path: '/:branchId',
    request: {
      params: branchParamSchema,
      body: {
        content: {
          'application/json': {
            schema: branchUpdateSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: branchSchema,
          },
        },
        description: 'Branch updated',
      },
    },
  }),
  async c => {
    const { branchId } = c.req.valid('param');
    const data = await c.req.valid('json');
    const branch = await updateBranch({ branchId, data });
    if (!branch) {
      throw new HTTPException(404, { message: 'Branch not found' });
    }
    return c.json(branch);
  },
);

branchRoute.openapi(
  createRoute({
    method: 'delete',
    path: '/:branchId',
    request: {
      params: branchParamSchema,
    },
    responses: {
      204: {
        description: 'Branch deleted',
      },
    },
  }),
  async c => {
    const { branchId } = c.req.valid('param');
    await deleteBranch({ branchId });
    c.status(204);
    return c.json(undefined);
  },
);
