import { Component, Input, OnInit } from '@angular/core';
import { Question } from "../../models/question.model";

@Component({
  selector: 'list-aplic-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.scss']
})
export class TrueFalseQuestionComponent implements OnInit {

  @Input() questions: Question[];

  constructor() {
  }

  ngOnInit() {
  }

}
