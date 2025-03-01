import { useTranslations } from 'next-intl';
import { Card, CardBody, Chip, Image } from '@heroui/react';
import { CompanyType } from '@takeaway/common';
import { CompanyDeleteButton } from './company-delete-button';
import { CompanyEditButton } from './company-edit-button';

type CompanyCardProps = {
  company: CompanyType;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const image = company.logoUrl ?? '/card.png';
  const t = useTranslations();

  const onEdit = (id: string) => {};

  const onDelete = (id: string) => {
    // updateSearchParams({
    //   action: FormActionEnum.Delete,
    //   editId: id,
    // });
  };
  return (
    <Card className="py-2">
      <CardBody className="overflow-visible">
        <div className="flex gap-6">
          <div className="flex flex-col justify-center align-middle">
            {image && <Image src={image} alt={company.name} isZoomed={true} width={120} className="h-32" />}
          </div>

          <div className="flex-1">
            <div className="flex flex-row justify-between align-middle">
              <p className={'line-clamp-1'}>{company.name}</p>
              <div>
                <div className="flex items-center gap-2">
                  <CompanyEditButton companyId={company._id} />
                  <CompanyDeleteButton companyId={company._id} />
                </div>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-default-500">{company.description}</p>

            <div className="mt-6 flex gap-2">
              {company.isActive && (
                <Chip color="success" size="sm">
                  {t('common.active')}
                </Chip>
              )}
              {!company.isActive && (
                <Chip color="danger" size="sm">
                  {t('common.inActive')}
                </Chip>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
