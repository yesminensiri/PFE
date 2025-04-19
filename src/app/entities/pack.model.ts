// src/app/entities/pack.model.ts
export interface Pack {
    id: number;
    nom: string;
    description: string;
    duree: number; // en mois
    prix: number;  // en euros (ou centimes selon votre besoin)
    features: string[];
  }