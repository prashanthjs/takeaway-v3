import React from 'react';
import { Bird } from 'lucide-react';

type EmptyPageProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function EmptyPage({ title, description, children, className = '' }: EmptyPageProps) {
  return (
    <div className={className}>
      <section className="flex  flex-col items-center justify-center gap-8 p-2 pt-32">
        <Bird size={128} />
        <div className="flex flex-col items-center gap-2">
          {title && <h1 className="text-2xl">{title}</h1>}
          {description && <div className="text-gray-300">{description}</div>}
        </div>
        <div className="flex flex-col items-center gap-2">{children}</div>
      </section>
    </div>
  );
}
