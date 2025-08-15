import OpenAI from 'openai';

export interface SOAPResult {
  practical: string;
  educational: string;
}

export class SOAPGenerator {
  async generateSOAP(clinicalText: string, language: string = 'pt'): Promise<SOAPResult> {
    if (!clinicalText.trim()) {
      throw new Error('Clinical text is required');
    }

    try {
      const response = await fetch('/api/generate-soap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clinicalText, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate SOAP');
      }

      const result = await response.json();
      return {
        practical: result.practical,
        educational: result.educational,
      };
    } catch (error) {
      console.error('SOAP generation error:', error);
      throw new Error('Failed to generate SOAP documentation');
    }
  }
}