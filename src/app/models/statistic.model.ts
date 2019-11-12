import { Question } from './question.model';

export interface Statistic {
  percent?: number;
  errorMessage?: string;
  questions?: Question[];
}
