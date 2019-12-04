import { ApplicationListStatus } from './enums/application-list-status';
import { KnowledgeAreas } from "./knowledge-areas.model";
import { Question } from "./question.model";
import { Subject } from "./subject.model";

export interface List {
  id?: string;
  name?: string;
  subjectCode?: string;
  user?: string;
  knowledgeAreas?: KnowledgeAreas[];
  difficultyLevel?: number;
  listApplicationId?: string;
  questions?: Question[];
  status?: ApplicationListStatus;
  tags?: string[];
  subjects?: Subject[];
  applicationDateTime?: Date;
  answerTime?: number;
}
