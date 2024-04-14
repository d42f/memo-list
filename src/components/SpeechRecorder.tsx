import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { Badge, Button, OverlayTrigger, Stack, Tooltip } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
  const { listening, transcript } = useSpeechRecognition();
  const onTranscriptRef = useRef(onTranscript);

  const startListening = useCallback(async () => {
    await SpeechRecognition.startListening({ language: DEFAULT_LANGUAGE, continuous: true });
    //const recognition = await SpeechRecognition.getRecognition();
  }, []);

  const stopListening = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  const handleClick = async () => {
    if (!listening) {
      startListening();
    } else {
      stopListening();
    }
  };

  useImperativeHandle(ref, () => ({ stop: stopListening }), [stopListening]);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    if (transcript) {
      onTranscriptRef.current?.(transcript);
    }
  }, [transcript]);

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
