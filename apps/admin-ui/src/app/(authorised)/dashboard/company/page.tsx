import { getTranslations } from 'next-intl/server';
import { ButtonAdd } from '@/components/button-add';
import { LayoutTitle } from '@/components/layout-title';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import { Pagination } from '@/components/pagination';
import { SectionEmpty } from '@/components/section-empty';
import { SectionErrorActionResponse } from '@/components/section-error-action-response';
import { SectionSearchBar } from '@/components/section-search-bar';
import { getCompaniesAction } from './_action';
import { CompanyCard } from './_components/company-card';
import { CompanyFormLoader } from './_components/company-form-loader';

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
  const result = await getCompaniesAction({
    page: searchParams?.page ? Number(searchParams?.page) : 1,
    limit: searchParams?.limit ? Number(searchParams?.limit) : 10,
    search: searchParams?.search,
    sortField: (searchParams?.sort as never) ?? 'name',
    sortOrder: (searchParams?.sortDirection as never) ?? 'asc',
  });
  const companies = result?.data;
  const hasCompanies = Array.isArray(companies?.data) && companies?.data.length > 0;

  if (result?.serverError || result?.validationErrors) {
    return <SectionErrorActionResponse serverError={result?.serverError} validationErrors={result?.validationErrors} />;
  }

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
        <ButtonAdd title={t('ctas.add')} />
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
      <CompanyFormLoader action={searchParams?.action} editId={searchParams?.editId} />
    </MaxWidthWrapper>
  );
}
