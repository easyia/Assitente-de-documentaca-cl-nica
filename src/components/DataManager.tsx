export interface DocumentRecord {
  id: string;
  timestamp: string;
  clinicalText: string;
  practicalSOAP: string;
  educationalSOAP: string;
}

export interface Metrics {
  today: number;
  week: number;
  total: number;
}

export class DataManager {
  private static readonly STORAGE_KEY = 'docsync_documents';

  static saveDocument(doc: Omit<DocumentRecord, 'id' | 'timestamp'>): DocumentRecord {
    const documents = this.getDocuments();
    const newDoc: DocumentRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...doc
    };
    
    documents.unshift(newDoc); // Add to beginning
    
    // Keep only last 100 documents to avoid localStorage limits
    if (documents.length > 100) {
      documents.splice(100);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(documents));
    return newDoc;
  }

  static getDocuments(): DocumentRecord[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading documents:', error);
      return [];
    }
  }

  static getMetrics(): Metrics {
    const documents = this.getDocuments();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayCount = documents.filter(doc => {
      const docDate = new Date(doc.timestamp);
      return docDate >= today;
    }).length;

    const weekCount = documents.filter(doc => {
      const docDate = new Date(doc.timestamp);
      return docDate >= weekAgo;
    }).length;

    return {
      today: todayCount,
      week: weekCount,
      total: documents.length
    };
  }

  static deleteDocument(id: string): boolean {
    try {
      const documents = this.getDocuments();
      const filteredDocs = documents.filter(doc => doc.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredDocs));
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      return false;
    }
  }

  static clearAllDocuments(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing documents:', error);
      return false;
    }
  }

  static exportDocuments(): string {
    const documents = this.getDocuments();
    return JSON.stringify(documents, null, 2);
  }

  static importDocuments(jsonData: string): boolean {
    try {
      const importedDocs: DocumentRecord[] = JSON.parse(jsonData);
      
      // Validate structure
      if (!Array.isArray(importedDocs)) {
        throw new Error('Invalid data structure');
      }

      for (const doc of importedDocs) {
        if (!doc.id || !doc.timestamp || !doc.clinicalText) {
          throw new Error('Invalid document structure');
        }
      }

      localStorage.setItem(this.STORAGE_KEY, jsonData);
      return true;
    } catch (error) {
      console.error('Error importing documents:', error);
      return false;
    }
  }
}
