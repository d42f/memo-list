import { forwardRef, useImperativeHandle } from 'react';
import { Badge, Button, OverlayTrigger, Stack, Tooltip } from 'react-bootstrap';
import { useSpeechRecognition } from 'hooks/useSpeechRecognition';

const DEFAULT_LANGUAGE = 'en-US';

export interface SpeechRecorderRef {
  stop: () => void;
}

interface SpeechRecorderProps {
  className?: string;
  onTranscript: (result: string) => void;
}

export const SpeechRecorder = forwardRef<SpeechRecorderRef, SpeechRecorderProps>(function SpeechRecorder(
  { className, onTranscript },
  ref,
): JSX.Element {
  const { listening, start, stop } = useSpeechRecognition({ language: DEFAULT_LANGUAGE, onTranscript });

  const handleClick = () => {
    if (!listening) {
      start();
    } else {
      stop();
    }
  };

  useImperativeHandle(ref, () => ({ stop }), [stop]);

  return (
    <Stack className={className} direction="horizontal" gap={2}>
      <Button variant={!listening ? 'outline-dark' : 'dark'} size="sm" onClick={handleClick}>
        {!listening ? <>⏺</> : <>⏹</>}
      </Button>
      <OverlayTrigger placement="right" overlay={<Tooltip>Only {DEFAULT_LANGUAGE}</Tooltip>}>
        <Badge bg="secondary">?</Badge>
      </OverlayTrigger>
    </Stack>
  );
});
