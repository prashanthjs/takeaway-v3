'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Alert, Button, Card, CardBody } from '@heroui/react';
import { Home, RefreshCw, ServerCrash } from 'lucide-react';
import { ZodIssue } from 'zod';
import { useNavigation } from '@admin-ui/hooks/use-navigation';
import { MaxWidthWrapper } from './max-width-wrapper';

type Props = {
  status?: number;
  statusText?: string;
  errors?: ZodIssue[];
};

export function SectionError({ status, statusText, errors }: Props) {
  const t = useTranslations('errorPage.500');
  const { homePageLink } = useNavigation();
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  const handleGoToHome = () => {
    router.push(homePageLink);
  };

  const errorDescription = (function () {
    let errorsText = null;
    if (errors && errors.length > 0) {
      errorsText = (
        <ul className="text-sm list-disc pl-5">
          {errors.map(error => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      );
    }
    return errorsText;
  })();

  return (
    <MaxWidthWrapper>
      <section className="flex  flex-col items-center justify-center gap-8 p-2 pt-32">
        <Card className="lg:w-2/3">
          <CardBody className="flex flex-col gap-6 overflow-visible px-6">
            <section className="flex  flex-col items-center justify-center gap-8 p-2 py-16 ">
              <ServerCrash size={128} />
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl">{t('title')}</h1>
                <p className="text-gray-300">{t('description')}</p>
                <Alert
                  color="danger"
                  title={statusText ?? status?.toString()}
                  description={errorDescription}
                  className="my-8"
                />

                <Button color="primary" startContent={<RefreshCw />} onPress={handleRetry}>
                  {t('ctas.retry')}
                </Button>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-gray-300">{t('returnToHome')}</p>
                <Button startContent={<Home />} onPress={handleGoToHome}>
                  {t('ctas.home')}
                </Button>
              </div>
            </section>
          </CardBody>
        </Card>
      </section>
    </MaxWidthWrapper>
  );
}
