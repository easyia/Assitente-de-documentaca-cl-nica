import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, FileText, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { SOAPResult } from './SOAPGenerator';
import { useI18n } from '@/i18n';

interface SOAPViewsProps {
  soapData: SOAPResult | null;
  isLoading: boolean;
}

interface ModeToggleProps {
  mode: 'practical' | 'educational';
  onModeChange: (mode: 'practical' | 'educational') => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onModeChange }) => {
  const { t } = useI18n();
  return (
    <div className="flex gap-2 mb-6">
      <Button
        onClick={() => onModeChange('practical')}
        variant={mode === 'practical' ? 'default' : 'outline'}
        className={`px-6 py-3 font-medium transition-all ${
          mode === 'practical'
            ? 'bg-medical-blue hover:bg-medical-blue/90 text-white shadow-medical'
            : 'border-medical-blue text-medical-blue hover:bg-medical-blue-light'
        }`}
      >
        <FileText className="w-4 h-4 mr-2" />
        {t('soap.practical')}
      </Button>
      <Button
        onClick={() => onModeChange('educational')}
        variant={mode === 'educational' ? 'default' : 'outline'}
        className={`px-6 py-3 font-medium transition-all ${
          mode === 'educational'
            ? 'bg-educational-purple hover:bg-educational-purple/90 text-white'
            : 'border-educational-purple text-educational-purple hover:bg-educational-purple-light'
        }`}
      >
        <GraduationCap className="w-4 h-4 mr-2" />
        {t('soap.educational')}
      </Button>
    </div>
  );
};

const PracticalView: React.FC<{ content: string }> = ({ content }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copiado!",
        description: "SOAP copiado para área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-medical-blue">
          {t('soap.documentation')}
        </h3>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          size="sm"
          className="border-medical-blue text-medical-blue hover:bg-medical-blue-light"
        >
          {copied ? (
            <CheckCircle2 className="w-4 h-4 mr-2" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          {copied ? 'Copiado!' : 'Copiar'}
        </Button>
      </div>
      
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-6">
          <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {content}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

const EducationalView: React.FC<{ content: string }> = ({ content }) => {
  const sections = parseEducationalContent(content);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-educational-purple">
          {t('soap.educationalAnalysis')}
        </h3>
        <span className="text-xs bg-educational-purple-light text-educational-purple px-2 py-1 rounded-full">
          {t('soap.clinicalReasoning')}
        </span>
      </div>

      <div className="space-y-3">
        {sections.subjective && (
          <ExpandableSection
            title={t('soap.subjectiveAnalysis')}
            content={sections.subjective}
            bgColor="soap-subjective-light"
            iconColor="soap-subjective"
          />
        )}
        
        {sections.objective && (
          <ExpandableSection
            title={t('soap.objectiveInterpretation')}
            content={sections.objective}
            bgColor="soap-objective-light"
            iconColor="soap-objective"
          />
        )}
        
        {sections.assessment && (
          <ExpandableSection
            title={t('soap.diagnosticReasoning')}
            content={sections.assessment}
            bgColor="soap-assessment-light"
            iconColor="soap-assessment"
          />
        )}
        
        {sections.plan && (
          <ExpandableSection
            title={t('soap.planJustifications')}
            content={sections.plan}
            bgColor="soap-plan-light"
            iconColor="soap-plan"
          />
        )}
        
        {sections.differentials && (
          <ExpandableSection
            title={t('soap.differentialDiagnosis')}
            content={sections.differentials}
            bgColor="warning-light"
            iconColor="warning"
          />
        )}
        
        {sections.pearls && (
          <Card className="bg-educational-purple-light border-educational-purple/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-educational-purple flex items-center gap-2">
                💡 {t('soap.clinicalPearls')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm space-y-2 text-foreground">
                <div className="whitespace-pre-wrap">{sections.pearls}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

interface ExpandableSectionProps {
  title: string;
  content: string;
  bgColor: string;
  iconColor: string;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ 
  title, 
  content, 
  bgColor, 
  iconColor 
}) => {
  return (
    <details className={`bg-${bgColor} rounded-lg border shadow-sm`}>
      <summary className={`font-semibold cursor-pointer p-4 text-${iconColor} hover:bg-opacity-80 transition-colors`}>
        {title}
      </summary>
      <div className="px-4 pb-4">
        <div className="text-sm space-y-2 text-foreground">
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </details>
  );
};

// Helper function to parse educational content into sections
function parseEducationalContent(content: string) {
  const sections = {
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    differentials: '',
    pearls: ''
  };

  // Split content by major sections
  const subjectiveMatch = content.match(/### S \(Subjetivo\)[\s\S]*?(?=### O \(Objetivo\)|## 2\.|$)/);
  const objectiveMatch = content.match(/### O \(Objetivo\)[\s\S]*?(?=### A \(Avaliação\)|## 2\.|$)/);
  const assessmentMatch = content.match(/### A \(Avaliação\)[\s\S]*?(?=### P \(Plano\)|## 2\.|$)/);
  const planMatch = content.match(/### P \(Plano\)[\s\S]*?(?=## 2\.|$)/);
  const differentialsMatch = content.match(/## 2\.[\s\S]*?(?=## 3\.|$)/);
  const pearlsMatch = content.match(/## 3\.[\s\S]*$/);

  if (subjectiveMatch) sections.subjective = subjectiveMatch[0].replace(/### S \(Subjetivo\)[\s\S]*?ANÁLISE:/, '').trim();
  if (objectiveMatch) sections.objective = objectiveMatch[0].replace(/### O \(Objetivo\)[\s\S]*?INTERPRETAÇÃO:/, '').trim();
  if (assessmentMatch) sections.assessment = assessmentMatch[0].replace(/### A \(Avaliação\)[\s\S]*?CLÍNICO:/, '').trim();
  if (planMatch) sections.plan = planMatch[0].replace(/### P \(Plano\)[\s\S]*?JUSTIFICATIVAS:/, '').trim();
  if (differentialsMatch) sections.differentials = differentialsMatch[0].replace(/## 2\.[^:]*:/, '').trim();
  if (pearlsMatch) sections.pearls = pearlsMatch[0].replace(/## 3\.[^:]*:/, '').trim();

  return sections;
}

export const SOAPViews: React.FC<SOAPViewsProps> = ({ soapData, isLoading }) => {
  const { t } = useI18n();
  const [mode, setMode] = useState<'practical' | 'educational'>('practical');

  if (isLoading) {
    return (
      <div className="space-y-4">
        <ModeToggle mode={mode} onModeChange={setMode} />
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-blue"></div>
              <span className="text-medical-blue font-medium">
                {t('soap.generatingDocumentation')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!soapData) {
    return (
      <div className="space-y-4">
        <ModeToggle mode={mode} onModeChange={setMode} />
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t('soap.recordAudioOrEnterClinicalText')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ModeToggle mode={mode} onModeChange={setMode} />
      
      {mode === 'practical' ? (
        <PracticalView content={soapData.practical} />
      ) : (
        <EducationalView content={soapData.educational} />
      )}
    </div>
  );
};