import { Card, CardBody, Skeleton } from '@heroui/react';

export function CardSkeleton() {
  return (
    <Card className="py-2">
      <CardBody className="overflow-visible">
        <div className="flex gap-6">
          <div className="flex flex-col justify-center align-middle">
            <Skeleton className="w-32 rounded-lg">
              <div className="h-32 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>

          <div className="flex-1">
            <div className="flex flex-row justify-between align-middle">
              <div className={'line-clamp-1'}>
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
            </div>
            <div className="line-clamp-2 text-sm text-default-500">
              <Skeleton className="w-full rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>

            <div className="mt-6 flex gap-2">
              <Skeleton className="w-full rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
