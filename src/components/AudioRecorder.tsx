import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n';

interface AudioRecorderProps {
  onTranscription: (text: string) => void;
  isProcessing: boolean;
  language?: string;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onTranscription, isProcessing, language = 'pt' }) => {
  const { t } = useI18n();
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast({
        title: t('interface.recording_started'),
        description: t('interface.recording_description'),
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: t('interface.recording_error_title'),
        description: t('interface.recording_error_description'),
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      formData.append('language', language);

      const response = await fetch('/api/transcribe-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const result = await response.json();
      onTranscription(result.text);
      toast({
        title: t('interface.transcription_success'),
        description: t('interface.transcription_description'),
      });
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: t('interface.transcription_error_title'),
        description: t('interface.transcription_error_description'),
        variant: "destructive",
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            disabled={isProcessing || isTranscribing}
            size="lg"
            className="h-16 w-16 rounded-full bg-medical-blue hover:bg-medical-blue/90 shadow-medical"
          >
            {isTranscribing ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            size="lg"
            variant="destructive"
            className="h-16 w-16 rounded-full animate-pulse-recording"
          >
            <Square className="h-8 w-8" />
          </Button>
        )}
      </div>
      
      <div className="text-center">
        {isRecording && (
          <div className="flex items-center space-x-2 text-medical-blue">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Gravando...</span>
          </div>
        )}
        {isTranscribing && (
          <div className="flex items-center space-x-2 text-medical-blue">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Transcrevendo...</span>
          </div>
        )}
        {!isRecording && !isTranscribing && (
          <p className="text-sm text-muted-foreground">
            Clique para gravar a anamnese
          </p>
        )}
      </div>
    </div>
  );
};