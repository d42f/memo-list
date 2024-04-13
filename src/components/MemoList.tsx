import { Stack } from 'react-bootstrap';
import { useStore } from '@nanostores/react';
import { $memos } from 'store/memos';
import { Card } from 'components/Card';

interface MemoListProps {
  className?: string;
}

export const MemoList = ({ className }: MemoListProps): JSX.Element => {
  const memos = useStore($memos);

  return (
    <Stack className={className} gap={3}>
      {memos.map((memo, index) => (
        <Card key={index} header={`Memo #${memo.id || 'unknown'}`}>
          {memo.description}
        </Card>
      ))}
    </Stack>
  );
};
