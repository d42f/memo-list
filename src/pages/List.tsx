import { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { NewMemo, addMemo } from 'store/memos';
import { Page } from 'components/Page';
import { Card } from 'components/Card';
import { NewMemoForm } from 'components/NewMemoForm';
import { MemoList } from 'components/MemoList';

export const List = (): JSX.Element => {
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
            <NewMemoForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
          </Card>
        ) : (
          <Button className="me-auto" onClick={() => setShowForm(true)}>
            Add new
          </Button>
        )}
        <MemoList />
      </Stack>
    </Page>
  );
};
