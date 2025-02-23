import { Suspense } from 'react';
import { CardSkeletons } from '@admin-ui/components/card-skeletons';
import { LayoutTitle } from '@admin-ui/components/layout-title';
import { MaxWidthWrapper } from '@admin-ui/components/max-width-wrapper';
import { Pagination } from '@admin-ui/components/pagination';
import { getCompanies } from '@admin-ui/server-actions/company-api.action';
import { CompanyCard } from './_components/company-card';

async function DataComponent({ page }: { page: number }) {
  const companies = await getCompanies({ page });
  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
        {companies.data.map(company => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </div>
      <Pagination total={20} />
    </>
  );
}

export default async function CompanyPage(props: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  return (
    <MaxWidthWrapper className="flex flex-col gap-4">
      <LayoutTitle title="Company" />
      <Suspense fallback={<CardSkeletons size={8} />}>
        <DataComponent page={page} />
      </Suspense>
    </MaxWidthWrapper>
  );
}
