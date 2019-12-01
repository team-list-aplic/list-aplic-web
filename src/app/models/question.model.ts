import { QuestionType } from "./enums/question-type";

export interface Question {
  id?: string;
  name?: string;
  options?: string[];
  type?: QuestionType;
  answer?: string;
  expectedAnswers?: string;
}
