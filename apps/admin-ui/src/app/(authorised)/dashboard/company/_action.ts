'use server';

import { FieldValues } from 'react-hook-form';
import { revalidatePath } from 'next/cache';
import qs from 'qs';
import { fetchData } from '@admin-ui/lib/server.utils';
import { RequestState } from '@admin-ui/types/form-action';
import { CompanyListQueryType, CompanyListResultType } from '@takeaway/common';

const companiesApiUrl = `/companies`;

export async function getCompanies(params: CompanyListQueryType) {
  const parsedParams = qs.stringify(params);
  return await fetchData<CompanyListResultType>({ url: `${companiesApiUrl}?${parsedParams}` });
}

export async function createCompany(state: RequestState | null, payload: FieldValues) {
  const data = await fetchData<CompanyListResultType>({ url: `${companiesApiUrl}`, method: 'POST', body: payload });
  if (data.isSuccess) {
    revalidatePath('/dashboard/company');
  }
  return data;
}
