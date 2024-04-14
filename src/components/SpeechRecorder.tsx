import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { Button } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
    await SpeechRecognition.startListening({ language: 'en-US', continuous: true });
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
    <Button className={className} variant={!listening ? 'outline-dark' : 'dark'} size="sm" onClick={handleClick}>
      {!listening ? <>⏺</> : <>⏹</>}
    </Button>
  );
});
