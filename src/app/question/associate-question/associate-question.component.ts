import { Component, Input, OnInit } from '@angular/core';
import { Question } from "../../models/question.model";

@Component({
  selector: 'list-aplic-associate-question',
  templateUrl: './associate-question.component.html',
  styleUrls: ['./associate-question.component.scss']
})
export class AssociateQuestionComponent implements OnInit {

  @Input() questions: Question[];

  constructor() {
  }

  ngOnInit() {
  }

}
