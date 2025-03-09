'use client';

import { Card, CardBody, Skeleton, Spinner } from '@heroui/react';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';

export default function DashboardLoading() {
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center justify-center gap-8 p-2 pt-32">
        <Card className="lg:w-2/3">
          <CardBody className="flex flex-col gap-6 overflow-visible px-6">
            <section className="flex flex-col items-center justify-center gap-8 p-2 py-16 ">
              <Skeleton className="rounded-lg" />
              <div className="flex flex-col items-center gap-8 w-[400px]">
                <Spinner size="lg" variant="wave" classNames={{ dots: 'h-4 w-4 ', wrapper: 'gap-4' }} />
              </div>
            </section>
          </CardBody>
        </Card>
      </section>
    </MaxWidthWrapper>
  );
}
