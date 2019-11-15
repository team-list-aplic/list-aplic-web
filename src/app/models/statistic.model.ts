import { Question } from './question.model';

export interface Statistic {
  completionPercentage?: number;
  errorMessage?: string;
  topFiveQuestions?: Question[];
}
