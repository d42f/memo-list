import { useCallback, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition as baseUseSpeechRecognition } from 'react-speech-recognition';

interface UseSpeechRecognition {
  supported: boolean;
  listening: boolean;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

interface UseSpeechRecognitionProps {
  language?: string;
  onTranscript?: (result: string) => void;
}

export const useSpeechRecognition = ({
  language,
  onTranscript,
}: UseSpeechRecognitionProps = {}): UseSpeechRecognition => {
  const { browserSupportsSpeechRecognition: supported, listening, transcript } = baseUseSpeechRecognition();
  const onTranscriptRef = useRef(onTranscript);

  const start = useCallback(() => SpeechRecognition.startListening({ language, continuous: true }), [language]);

  const stop = useCallback(() => SpeechRecognition.stopListening(), []);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    if (transcript) {
      onTranscriptRef.current?.(transcript);
    }
  }, [transcript]);

  return { supported, listening, start, stop };
};
