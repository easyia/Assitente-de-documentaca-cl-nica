import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Sparkles } from 'lucide-react';

interface TextInputProps {
  onTextSubmit: (text: string) => void;
  isProcessing: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ 
  onTextSubmit, 
  isProcessing, 
  value, 
  onChange 
}) => {
  const handleSubmit = () => {
    if (value.trim()) {
      onTextSubmit(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="clinical-text" className="text-sm font-medium text-foreground">
          Dados Clínicos
        </Label>
        <Textarea
          id="clinical-text"
          placeholder="Descreva a anamnese, sinais vitais, exame físico e achados relevantes do paciente...

Exemplo:
- Paciente masculino, 45 anos
- QP: Dor abdominal há 6h, epigástrica, irradiando para dorso
- HDA: Dor intensa 8/10, náuseas, vômitos
- AP: Etilismo crônico
- EF: PA 140/90, FC 100, Tax 37.2°C
- Abdome: dor à palpação em epigástrio, Murphy negativo"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[200px] resize-vertical"
          disabled={isProcessing}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Pressione Cmd/Ctrl + Enter para processar
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!value.trim() || isProcessing}
          className="bg-medical-blue hover:bg-medical-blue/90 shadow-medical"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar SOAP
            </>
          )}
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground space-y-1 bg-info-light p-3 rounded-lg">
        <p className="font-medium text-info">💡 Dicas para melhor resultado:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Inclua dados demográficos (idade, sexo)</li>
          <li>Descreva a queixa principal e história atual</li>
          <li>Mencione sinais vitais e achados do exame físico</li>
          <li>Adicione antecedentes relevantes se houver</li>
        </ul>
      </div>
    </div>
  );
};