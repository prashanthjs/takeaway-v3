import { useTranslations } from 'next-intl';
import { Button, Card, CardBody, Link } from '@heroui/react';
import { Home, ServerCrash } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function NotFound() {
  const t = useTranslations('errorPage.404');

  return (
    <div>
      <section className="m-auto min-h-screen max-w-[1600px] space-y-3 py-64">
        <div className="container flex flex-col items-center justify-center gap-4">
          <div className="flex h-16 w-64 flex-col items-center justify-center">
            <Logo />
          </div>
          <Card className=" lg:w-2/3">
            <CardBody className="flex-col gap-6 overflow-visible px-6">
              <section className="flex  flex-col items-center justify-center gap-8 p-2 py-16 ">
                <ServerCrash size={128} />
                <div className="flex flex-col items-center gap-2">
                  <h1 className="text-2xl">{t('title')}</h1>
                  <p className="text-gray-300">{t('description')}</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-300">{t('returnToHome')}</p>
                  <Button startContent={<Home />} as={Link} href="/">
                    {t('ctas.home')}
                  </Button>
                </div>
              </section>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
