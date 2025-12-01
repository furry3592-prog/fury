export enum Subject {
  MATH = 'Математика',
  UKR_LANG = 'Українська мова',
  LITERATURE = 'Література',
  ENGLISH = 'Англійська мова',
  HISTORY = 'Історія'
}

export interface Correction {
  original: string;
  correction: string;
  explanation: string;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  corrections: Correction[];
}

export interface HomeworkFile {
  id: string;
  title: string;
  subject: Subject;
  date: string;
  imageUrl?: string;
  score?: number;
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  icon: string;
  files: HomeworkFile[];
}

export type ViewState = 'dashboard' | 'grader' | 'folder';
