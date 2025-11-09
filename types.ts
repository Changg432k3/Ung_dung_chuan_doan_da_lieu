
export interface SkincareRecommendations {
  cleanser: string;
  moisturizer: string;
  sunscreen: string;
  activeIngredients: string[];
}

export interface DiagnosisResult {
  potentialDiagnosis: string;
  confidenceScore: 'High' | 'Medium' | 'Low';
  description: string;
  commonSymptoms: string[];
  possibleTreatments: string[];
  skincareRecommendations: SkincareRecommendations;
  disclaimer: string;
}

export interface ImageFile {
  file: File;
  preview: string;
}
