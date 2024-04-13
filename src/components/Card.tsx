import { ReactNode } from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

interface CardProps {
  className?: string;
  header?: string;
  children: ReactNode;
}

export const Card = ({ className, header, children }: CardProps): JSX.Element => (
  <BootstrapCard className={className}>
    {header && <BootstrapCard.Header>{header}</BootstrapCard.Header>}
    <BootstrapCard.Body>{children}</BootstrapCard.Body>
  </BootstrapCard>
);
