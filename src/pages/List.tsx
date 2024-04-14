import { useState } from 'react';
import { Alert, Button, Stack } from 'react-bootstrap';
import { useStore } from '@nanostores/react';
import { $memos, NewMemo, addMemo, removeMemo, updateMemo } from 'store/memos';
import { Page } from 'components/Page';
import { Card } from 'components/Card';
import { MemoForm } from 'components/MemoForm';
import { MemoList } from 'components/MemoList';

export const List = (): JSX.Element => {
  const memos = useStore($memos);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (memo: NewMemo) => {
    addMemo(memo);
    setShowForm(false);
  };

  return (
    <Page>
      <Stack gap={3}>
        {showForm ? (
          <Card header="New memo">
            <MemoForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
          </Card>
        ) : (
          <Button className="me-auto" onClick={() => setShowForm(true)}>
            Add new
          </Button>
        )}
        {memos.length ? (
          <MemoList memos={memos} onUpdate={(id, patch) => updateMemo({ id, patch })} onRemove={removeMemo} />
        ) : (
          <Alert variant="light">Empty list</Alert>
        )}
      </Stack>
    </Page>
  );
};
