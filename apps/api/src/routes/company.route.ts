import { HTTPException } from 'hono/http-exception';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import {
  companyCreateSchema,
  companyListQuerySchema,
  companyListResultSchema,
  companyParamSchema,
  companySchema,
  companyUpdateSchema,
} from '@takeaway/common';
import {
  createCompany,
  deleteCompany,
  getCompany,
  getCompanyCount,
  getCompanyList,
  updateCompany,
} from '../services/company.service';

// TODO: CONTROL ACCESS TO PRIVATE FIELDS
// TODO: CONTROL ACCESS TO SHOW ONLY ACTIVE COMPANIES

export const companyRoute = new OpenAPIHono();

companyRoute.openapi(
  createRoute({
    method: 'get',
    path: '/',
    request: {
      query: companyListQuerySchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: companyListResultSchema,
          },
        },
        description: 'Company list',
      },
    },
  }),
  async c => {
    const query = c.req.valid('query');
    const count = await getCompanyCount({ query });
    const companyList = await getCompanyList({
      query,
    });
    return c.json({ meta: { count, page: query.page, limit: query.limit }, data: companyList });
  },
);

companyRoute.openapi(
  createRoute({
    method: 'get',
    path: '/{companyId}',
    request: {
      params: companyParamSchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: companySchema,
          },
        },
        description: 'get the company details',
      },
    },
  }),
  async c => {
    const company = await getCompany({ companyId: c.req.valid('param').companyId });
    if (!company) {
      throw new HTTPException(404, { message: 'Company not found' });
    }
    return c.json(company);
  },
);

companyRoute.openapi(
  createRoute({
    method: 'post',
    path: '/',
    request: {
      body: {
        content: {
          'application/json': {
            schema: companyCreateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: companySchema,
          },
        },
        description: 'Create the company',
      },
    },
  }),
  async c => {
    const payload = c.req.valid('json');
    if (await getCompany({ companyId: payload.name })) {
      console.log('Company already exists');
      throw new HTTPException(409, { message: 'Company already exists' });
    }
    const response = await createCompany({
      company: c.req.valid('json'),
    });
    c.status(201);
    return c.json(response);
  },
);

companyRoute.openapi(
  createRoute({
    method: 'put',
    path: '/{companyId}',
    request: {
      params: companyParamSchema,
      body: {
        content: {
          'application/json': {
            schema: companyUpdateSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: companySchema,
          },
        },
        description: 'update the company',
      },
    },
  }),
  async c => {
    const payload = c.req.valid('json');
    const company = await getCompany({ companyId: c.req.valid('param').companyId });
    if (!company) {
      throw new HTTPException(404, { message: 'Company not found' });
    }
    if (company.name !== payload.name) {
      throw new HTTPException(400, { message: 'Company name cannot be updated' });
    }
    if (company.__v !== payload.__v) {
      throw new HTTPException(412, { message: 'Optimistic locking error' });
    }
    const response = await updateCompany({
      company: payload,
      companyId: company._id,
    });
    return c.json({
      ...response,
    });
  },
);

companyRoute.openapi(
  createRoute({
    method: 'delete',
    path: '/{companyId}',
    request: {
      params: companyParamSchema,
    },
    responses: {
      200: {
        description: 'delete the company details',
      },
      204: {
        description: 'delete the company details',
      },
    },
  }),
  async c => {
    await deleteCompany({ companyId: c.req.valid('param').companyId });
    c.status(204);
    return c.json(undefined);
  },
);
