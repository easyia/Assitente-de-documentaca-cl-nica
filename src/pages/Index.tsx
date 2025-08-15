import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Mic, Type, RefreshCw, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n';

import { ApiKeySetup } from '@/components/ApiKeySetup';
import { AudioRecorder } from '@/components/AudioRecorder';
import { TextInput } from '@/components/TextInput';
import { SOAPViews } from '@/components/SOAPViews';
import { MetricsDisplay } from '@/components/MetricsDisplay';
import { SOAPGenerator, type SOAPResult } from '@/components/SOAPGenerator';
import { DataManager, type Metrics } from '@/components/DataManager';

const Onboarding = () => {
  const { t } = useI18n();
  return (
    <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-medical-blue-light to-educational-purple-light shadow-card border border-medical-blue">
      <h2 className="text-2xl font-bold mb-2 text-medical-blue">{t('onboarding.title')}</h2>
      <p className="text-base mb-2">{t('onboarding.intro')}</p>
      <ul className="list-disc pl-6 text-sm mb-2">
        <li>{t('onboarding.step1')}</li>
        <li>{t('onboarding.step2')}</li>
        <li>{t('onboarding.step3')}</li>
      </ul>
      <p className="text-sm text-educational-purple font-semibold">{t('onboarding.premium')}</p>
    </div>
  );
};

const Index = () => {
  const { t, language } = useI18n();
  const [clinicalText, setClinicalText] = useState('');
  const [soapData, setSoapData] = useState<SOAPResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>({ today: 0, week: 0, total: 0 });
  const [inputMode, setInputMode] = useState<'audio' | 'text'>('text');
  const { toast } = useToast();

  useEffect(() => {
    // Load metrics
    updateMetrics();
  }, []);

  const updateMetrics = () => {
    const currentMetrics = DataManager.getMetrics();
    setMetrics(currentMetrics);
  };

  const handleTranscription = (text: string) => {
    setClinicalText(text);
  };

  const handleTextSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const generator = new SOAPGenerator();
      const result = await generator.generateSOAP(text, language);
      
      setSoapData(result);
      
      // Save to local storage
      DataManager.saveDocument({
        clinicalText: text,
        practicalSOAP: result.practical,
        educationalSOAP: result.educational
      });
      
      updateMetrics();
      
      toast({
        title: t('interface.soap_success'),
        description: t('interface.soap_ready'),
      });
    } catch (error) {
      console.error('Error generating SOAP:', error);
      toast({
        title: t('interface.soap_error'),
        description: t('interface.soap_error'),
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewDocument = () => {
    setClinicalText('');
    setSoapData(null);
    setInputMode('text');
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <Onboarding />
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-medical-blue p-3 rounded-full shadow-medical">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-medical bg-clip-text text-transparent">
                {t('interface.app_name')}
              </h1>
              <span className="text-sm text-muted-foreground">
                {t('interface.assistant_description')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <MetricsDisplay metrics={metrics} />
            <Button
              onClick={handleNewDocument}
              variant="outline"
              size="sm"
              className="border-medical-blue text-medical-blue hover:bg-medical-blue-light"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('interface.new_document')}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-blue">
                  <Type className="w-5 h-5" />
                  {t('interface.clinical_data_input')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={inputMode} onValueChange={(value) => setInputMode(value as 'audio' | 'text')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      {t('interface.text_input')}
                    </TabsTrigger>
                    <TabsTrigger value="audio" className="flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      {t('interface.audio_input')}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="mt-6">
                    <TextInput
                      onTextSubmit={handleTextSubmit}
                      isProcessing={isProcessing}
                      value={clinicalText}
                      onChange={setClinicalText}
                    />
                  </TabsContent>
                  
                  <TabsContent value="audio" className="mt-6">
                    <div className="space-y-4">
                      <AudioRecorder
                        onTranscription={handleTranscription}
                        isProcessing={isProcessing}
                        language={language}
                      />
                      
                      {clinicalText && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">{t('interface.transcribed_text')}:</h4>
                            <div className="p-3 bg-muted rounded-lg text-sm">
                              {clinicalText}
                            </div>
                            <Button
                              onClick={() => handleTextSubmit(clinicalText)}
                              disabled={isProcessing}
                              className="w-full bg-medical-blue hover:bg-medical-blue/90"
                            >
                              {t('interface.generate_soap_from_transcription')}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-blue">
                  <Stethoscope className="w-5 h-5" />
                  {t('interface.soap_documentation')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SOAPViews soapData={soapData} isLoading={isProcessing} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span>{t('interface.app_description')}</span>
            <span>•</span>
            <span>{t('interface.powered_by_openai')}</span>
          </div>
          <p className="text-xs">
            {t('interface.disclaimer')}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
