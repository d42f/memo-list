import { useState } from 'react';
import { Button, CloseButton, Stack } from 'react-bootstrap';
import { Memo } from 'store/memos';
import { Card } from 'components/Card';
import { CardBar } from 'components/CardBar';
import { MemoForm } from 'components/MemoForm';

interface MemoListProps {
  className?: string;
  memos: Memo[];
  onUpdate: (id: number, patch: Partial<Memo>) => void;
  onRemove: (memo: Memo) => void;
}

export const MemoList = ({ className, memos, onUpdate, onRemove }: MemoListProps): JSX.Element => {
  const [editedId, setEditedId] = useState<number | null>(null);

  const handleUpdate = ({ id, ...patch }: Memo) => {
    if (editedId) {
      onUpdate(editedId, patch);
      setEditedId(null);
    }
  };

  return (
    <Stack className={className} gap={3}>
      {memos.map(memo => (
        <Card
          key={memo.id}
          header={
            <Stack direction="horizontal">
              {`Memo #${memo.id || 'unknown'}`}
              <CloseButton className="ms-auto" type="button" onClick={() => onRemove(memo)} />
            </Stack>
          }
        >
          {editedId === memo.id ? (
            <MemoForm value={memo} onSubmit={handleUpdate} onCancel={() => setEditedId(null)} />
          ) : (
            <>
              <pre>{memo.description}</pre>
              <CardBar className="mt-3">
                <Button size="sm" variant="outline-secondary" onClick={() => setEditedId(memo.id)}>
                  Edit
                </Button>
              </CardBar>
            </>
          )}
        </Card>
      ))}
    </Stack>
  );
};
