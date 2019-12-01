import { QuestionType } from "./enums/question-type";

export interface Column {
  letra?: string;
  descricao?: string;
}

export interface DiscursiveExpectedAnswer {
  peso?: number;
  descricao?: string;
}

export interface MultipleChoicesExpectedAnswer {
  descricao?: string;
  correta?: boolean;
}

export interface TrueFalseExpectedAnswer {
  descricao?: string;
  correta?: boolean;
}

export interface AssociativeExpectedAnswer {
  colunaPrincipal?: Column;
  colunaAssociada?: Column;
}

export interface Question {
  id?: string;
  name?: string;
  options?: string[];
  type?: QuestionType;
  answer?: string;
  expectedAnswers?: any[];
}
