import { KnowledgeAreas } from "./knowledge-areas.model";
import { Subject } from "./subject.model";
import { Question } from "./question.model";

export interface List {
  id?: string;
  name?: string;
  subjectCode?: string;
  user?: string;
  knowledgeAreas?: KnowledgeAreas[];
  difficultyLevel?: number;
  listApplicationId?: string;
  questions?: Question[];
  status?: string;
  tags?: string[];
  subjects?: Subject[];
  applicationDateTime?: Date;
  answerTime?: number;
}
