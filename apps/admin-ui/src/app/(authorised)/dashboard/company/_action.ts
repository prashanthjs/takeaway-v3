'use server';

import { FieldValues } from 'react-hook-form';
import { flattenValidationErrors } from 'next-safe-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  CompanyListResultType,
  companyListQuerySchema,
  companyCreateSchema,
  CompanyType,
  companyUpdateSchema,
} from '@takeaway/common';
import { actionClient } from '@/utils/action-client.util';
import { fetchData } from '@/utils/fetch.util';

const companiesApiUrl = `/companies`;

export const getCompaniesAction = actionClient
  .metadata({ actionName: 'getCompaniesAction' })
  .schema(companyListQuerySchema, {
    handleValidationErrorsShape: async ve => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: queryObj }) => {
    const { data } = await fetchData<CompanyListResultType>({ url: companiesApiUrl, query: queryObj });
    return data;
  });

export const getCompanyAction = actionClient
  .metadata({ actionName: 'getCompanyAction' })
  .schema(z.object({ editId: z.string() }))
  .action(async ({ parsedInput }) => {
    const { data } = await fetchData<CompanyType>({ url: `${companiesApiUrl}/${parsedInput.editId}` });
    return data;
  });

export const saveCompanyAction = actionClient
  .metadata({ actionName: 'saveCompanyAction' })
  .schema(companyCreateSchema, {
    handleValidationErrorsShape: async ve => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: payload }) => {
    console.log('payload', payload);
    const { data } = await fetchData<CompanyType>({
      url: `${companiesApiUrl}`,
      method: 'POST',
      body: payload,
    });
    const { data: company } = await fetchData<CompanyType>({ url: `${companiesApiUrl}/${data._id}` });
    revalidatePath('/dashboard/company');
    return company;
  });

export const updateCompanyAction = actionClient
  .metadata({ actionName: 'updateCompanyAction' })
  .schema(companyUpdateSchema, {
    handleValidationErrorsShape: async ve => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: payload }) => {
    await fetchData<CompanyType>({
      url: `${companiesApiUrl}/${payload._id}`,
      method: 'PUT',
      body: payload,
    });
    const { data: company } = await fetchData<CompanyType>({ url: `${companiesApiUrl}/${payload._id}` });
    revalidatePath('/dashboard/company');
    return company;
  });

export const deleteCompanyAction = actionClient
  .metadata({ actionName: 'deleteCompanyAction' })
  .schema(z.object({ _id: z.string() }))
  .action(async ({ parsedInput }) => {
    const { data } = await fetchData<CompanyType>({ url: `${companiesApiUrl}/${parsedInput._id}`, method: 'DELETE' });
    revalidatePath('/dashboard/company');
    return data;
  });
