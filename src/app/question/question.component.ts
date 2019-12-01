import { Component, Input, OnInit } from '@angular/core';
import { Question } from "../models/question.model";
import { QuestionType } from "../models/enums/question-type";

@Component({
  selector: 'list-aplic-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() questions: Question[];

  associativeQuestions: Question[] = [];
  discursiveQuestions: Question[] = [];
  trueFalseQuestions: Question[] = [];
  multipleChoicesQuestions: Question[] = [];

  constructor() {
  }

  ngOnInit() {
    debugger;
    if (this.questions && this.questions.length > 0) {
      this._sortQuestions();
    }
  }

  private _sortQuestions() {
    this.questions.forEach(question => {
      switch (question.type) {
        case QuestionType.COLUMN_BINDING: {
          this.associativeQuestions.push(question);
          break;
        }
        case QuestionType.DISCURSIVE: {
          this.discursiveQuestions.push(question);
          break;
        }
        case QuestionType.MULTIPLE_CHOICE: {
          this.multipleChoicesQuestions.push(question);
          break;
        }
        case QuestionType.TRUE_OR_FALSE: {
          this.trueFalseQuestions.push(question);
          break;
        }
      }
    });
  }


}
