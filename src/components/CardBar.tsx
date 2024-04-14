import { ReactNode } from 'react';
import { Stack } from 'react-bootstrap';

interface CardBarProps {
  className?: string;
  children: ReactNode;
}

export const CardBar = ({ className, children }: CardBarProps): JSX.Element => (
  <Stack className={className} direction="horizontal" gap={2}>
    {children}
  </Stack>
);
