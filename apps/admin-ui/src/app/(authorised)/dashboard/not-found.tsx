import { useTranslations } from 'next-intl';
import { Button, Card, CardBody, Link } from '@heroui/react';
import { Home, ServerCrash } from 'lucide-react';
import { LayoutTitle } from '@admin-ui/components/layout-title';
import { MaxWidthWrapper } from '@admin-ui/components/max-width-wrapper';

export default function DashboardNotFoundPage() {
  const t = useTranslations('errorPage.403');

  return (
    <MaxWidthWrapper>
      <LayoutTitle title="404" />
      <section className="flex  flex-col items-center justify-center gap-8 p-2 pt-32">
        <Card className=" lg:w-2/3">
          <CardBody className="flex-col gap-6 overflow-visible px-6">
            <section className="flex  flex-col items-center justify-center gap-8 p-2 py-16 ">
              <ServerCrash size={128} />
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl">{t('title')}</h1>
                <p className="text-gray-300">{t('description')}</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-gray-300">{t('returnToDashboard')}</p>
                <Button startContent={<Home />} as={Link} href="/">
                  {t('ctas.dashboard')}
                </Button>
              </div>
            </section>
          </CardBody>
        </Card>
      </section>
    </MaxWidthWrapper>
  );
}
