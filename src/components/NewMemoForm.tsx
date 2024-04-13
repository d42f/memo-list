import { FormEvent, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { NewMemo } from 'store/memos';

interface NewMemoFormProps {
  className?: string;
  onAdd: (memo: NewMemo) => void;
  onCancel?: () => void;
}

export const NewMemoForm = ({ className, onAdd, onCancel }: NewMemoFormProps): JSX.Element => {
  const [memo, setMemo] = useState<NewMemo>({ description: '' });

  const handleChange = (target: string, targetValue: unknown) => {
    setMemo(value => ({ ...value, [target]: targetValue }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onAdd(memo);
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <fieldset>
        <Form.FloatingLabel label="Description" className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter text"
            required={true}
            value={memo.description}
            onChange={event => handleChange('description', event.target.value)}
          />
        </Form.FloatingLabel>
        <Stack direction="horizontal" gap={2}>
          <Button type="submit">Add</Button>
          {onCancel && (
            <Button type="button" variant="link" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </fieldset>
    </Form>
  );
};
