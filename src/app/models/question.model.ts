export enum QuestionType {
  DISCURSIVE,
  OBJECTIVE,
}

export interface Question {
  id?: string;
  name?: string;
  options?: string[];
  type?: QuestionType;
  answer?: string;
}
