export interface Offer {
  id: number;
  title: string;
  description: string;
  companyId: number;
  companyName: string;
  companyLogo?: string;
  location: string;
  type: string;
  domain: string;
  availability: string;
  skills: string[];
  date: Date;
  isFavorite: boolean;
  duration: string; // Rendre obligatoire
  requiredDocuments?: string[];
  testimonials?: Array<{ author: string; comment: string }>;
}