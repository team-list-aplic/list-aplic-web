import { KnowledgeAreas } from "./knowledge-areas.model";
import { Subject } from "./subject.model";
import { Question } from "./question.model";
import { ApplicationListStatus } from "./enums/application-list-status";

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
}
