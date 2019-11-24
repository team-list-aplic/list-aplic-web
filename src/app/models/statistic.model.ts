import { QuestionCounter } from './question-counter.model';

export interface Statistic {
  completionPercentage?: number;
  errorMessage?: string;
  topFiveQuestions?: QuestionCounter[];
}
