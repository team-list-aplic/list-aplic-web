import { Component, Input, OnInit } from '@angular/core';
import { Question } from "../../models/question.model";

@Component({
  selector: 'list-aplic-multiple-choices-question',
  templateUrl: './multiple-choices-question.component.html',
  styleUrls: ['./multiple-choices-question.component.scss']
})
export class MultipleChoicesQuestionComponent implements OnInit {

  @Input() questions: Question[];

  constructor() {
  }

  ngOnInit() {
  }

}
