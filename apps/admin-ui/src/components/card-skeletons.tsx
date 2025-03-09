import { cn } from '@/utils/common';
import { CardSkeleton } from './card-skeleton';

type CardSkeletonsProps = {
  className?: string;
  size?: number;
};

export function CardSkeletons({ className = '', size = 8 }: CardSkeletonsProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3', className)}>
      {Array.from(Array(size).keys()).map(index => {
        return <CardSkeleton key={index} />;
      })}
    </div>
  );
}
