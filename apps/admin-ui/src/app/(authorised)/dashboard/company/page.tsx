import { getTranslations } from 'next-intl/server';
import { ZodIssue } from 'zod';
import { ButtonAdd } from '@admin-ui/components/button-add';
import { LayoutTitle } from '@admin-ui/components/layout-title';
import { MaxWidthWrapper } from '@admin-ui/components/max-width-wrapper';
import { Pagination } from '@admin-ui/components/pagination';
import { SectionEmpty } from '@admin-ui/components/section-empty';
import { SectionError } from '@admin-ui/components/section-error';
import { SectionSearchBar } from '@admin-ui/components/section-search-bar';
import { getCompanies } from './_action';
import { CompanyCard } from './_components/company-card';
import { CompanyForm } from './_components/company-form';

interface SearchParamsProps {
  searchParams?: {
    search?: string;
    page?: string;
    sort?: string;
    sortDirection?: string;
    limit?: string;
    action?: 'create' | 'edit';
    editId?: string;
  };
}

export default async function CompanyPage(params: SearchParamsProps) {
  const searchParams = await params.searchParams;
  const t = await getTranslations('company');
  const {
    isSuccess,
    data: companies,
    errors,
    status,
    statusText,
  } = await getCompanies({
    page: searchParams?.page ? Number(searchParams?.page) : 1,
    limit: searchParams?.limit ? Number(searchParams?.limit) : 10,
    search: searchParams?.search,
    sortField: (searchParams?.sort as never) ?? 'name',
    sortOrder: (searchParams?.sortDirection as never) ?? 'asc',
  });

  if (!isSuccess) {
    return <SectionError status={status} statusText={statusText} errors={errors as ZodIssue[]} />;
  }

  const hasCompanies = Array.isArray(companies?.data) && companies?.data.length > 0;

  return (
    <MaxWidthWrapper className="flex flex-col gap-4">
      <LayoutTitle title={t('title')} />
      <SectionSearchBar
        sortOptions={[
          { value: 'name', label: t('sort.options.name') },
          { value: 'createdAt', label: t('sort.options.createdAt') },
          { value: 'updatedAt', label: t('sort.options.updatedAt') },
        ]}
      />
      <div className="flex justify-start mt-2">
        <ButtonAdd title={t('addCompanyCTA')} />
      </div>

      <div className="mt-5">
        {hasCompanies && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
            {companies?.data?.map(company => <CompanyCard key={company._id} company={company} />)}
          </div>
        )}
        {!hasCompanies && <SectionEmpty title={t('empty.title')} description={t('empty.description')}></SectionEmpty>}
        <div className="flex justify-center mt-4">
          <Pagination total={companies?.meta?.total ?? 0} />
        </div>
      </div>
      <CompanyForm />
    </MaxWidthWrapper>
  );
}
