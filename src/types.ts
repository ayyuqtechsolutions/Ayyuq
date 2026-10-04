export type PageId = 'command-center' | 'systems' | 'orbit' | 'team' | 'launch-pad' | 'transmission';

export interface ConstellationNode {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  features: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  coordinates: { x: number; y: number };
  accent: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  timeline: string;
  description: string;
  architecturePreview: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  problemStatement: string;
  ayyuqSolution: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

export type ServiceTypeOptionId = 
  | 'websites'
  | 'mobile-apps'
  | 'custom-desktop-software'
  | 'enterprise-erps-crms'
  | 'inventory-business-systems'
  | 'seo-digital-marketing-design'
  | 'tech-support-maintenance';

export type CurrencyMode = 'INR' | 'USD';

export interface EstimatorState {
  systemType: ServiceTypeOptionId;
  selectedScaleId: string;
  additionalNotes: string;
}

export interface TerminalLog {
  id: string;
  text: string;
  type: 'system' | 'info' | 'success' | 'warning' | 'prompt';
  timestamp: string;
}

export interface BookingDetails {
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  company: string;
  timezone: string;
  systemManifest?: string;
}
