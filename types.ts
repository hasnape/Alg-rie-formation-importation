export interface QuizQuestion {
  id: string;
  label: string;
  type: 'text' | 'select';
  options?: string[];
}

export interface ModuleData {
  id: number;
  title: string;
  description: string;
  quiz: {
    questions: QuizQuestion[];
    answers: string[];
  };
}

export interface Offer {
  id: number;
  title: string;
  price: string;
  priceSubtitle?: string;
  features: string[];
  isRecommended?: boolean;
  isFree?: boolean;
  excludedFeatures?: string[];
  notes?: string[];
}

export interface ChecklistItem {
  id: number;
  text: string;
}

// Fix: Moved UserTier to types.ts to be shared across components.
export type UserTier = 'free' | 'premium' | 'full_service' | 'expat';

export type Language = 'fr' | 'en' | 'ar';

// Fix: Add missing type definitions for GlossaryTerm and DocumentTemplate.
export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface DocumentTemplateField {
  id: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'textarea';
  rows?: number;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  fields: DocumentTemplateField[];
  content: string;
}
