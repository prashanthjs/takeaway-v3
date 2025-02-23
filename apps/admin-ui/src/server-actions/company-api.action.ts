import { CompanyListResultType } from '@takeaway/common';

const companiesApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/companies`;

export async function getCompanies({ page }: { page: number }): Promise<CompanyListResultType> {
  const res = await fetch(`${companiesApiUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to get companies');
  }
  return res.json();
}
