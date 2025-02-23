import type { ReactNode } from 'react';
import { Accordion, AccordionItem, Card, CardBody } from '@heroui/react';

export type SearchFormWrapperProps = {
  children: ReactNode;
  title?: string;
};

export function SearchFormWrapper({ children, title }: SearchFormWrapperProps) {
  return (
    <Card className="mb-5">
      <CardBody>
        <Accordion>
          <AccordionItem key="1" aria-label={title} title={title}>
            {children}
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}
