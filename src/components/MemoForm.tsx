import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Memo, NewMemo } from 'store/memos';
import { CardBar } from 'components/CardBar';

type SubmitCallback<T> = (value: T) => void;

interface NewValueProps {
  onSubmit: SubmitCallback<NewMemo>;
}

interface ExistValueProps {
  value: Memo;
  onSubmit: SubmitCallback<Memo>;
}

type BaseProps = NewValueProps | ExistValueProps;

interface MemoFormProps {
  className?: string;
  onCancel?: () => void;
}

export const MemoForm = ({ className, onSubmit, onCancel, ...rest }: MemoFormProps & BaseProps): JSX.Element => {
  const [memo, setMemo] = useState<Memo | NewMemo>('value' in rest ? rest.value : { description: '' });
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleTextareaKeyUp = (event: KeyboardEvent) => {
    const key = event.key || event.keyCode;
    if (event.ctrlKey && (key === 'Enter' || key === 13)) {
      submitButtonRef.current?.click();
    } else if (key === 'Escape' || key === 27) {
      onCancel?.();
    }
  };

  const handleChange = (target: string, targetValue: unknown) => {
    setMemo(value => ({ ...value, [target]: targetValue }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if ('id' in memo) {
      (onSubmit as SubmitCallback<Memo>)(memo);
    } else {
      (onSubmit as SubmitCallback<NewMemo>)(memo);
    }
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <fieldset>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm="3" md="2">
            Description
          </Form.Label>
          <Col sm="9" md="10">
            <Form.Control
              as="textarea"
              rows={3}
              autoFocus={true}
              placeholder="Enter text"
              required={true}
              value={memo.description}
              onKeyUp={handleTextareaKeyUp}
              onChange={event => handleChange('description', event.target.value)}
            />
          </Col>
        </Form.Group>
        <CardBar>
          <Button ref={submitButtonRef} type="submit" size="sm">
            Ok
          </Button>
          {onCancel && (
            <Button type="button" size="sm" variant="link-dark" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </CardBar>
      </fieldset>
    </Form>
  );
};