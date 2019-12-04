import { Component, Input, OnInit } from '@angular/core';
import { Question } from "../../models/question.model";

@Component({
  selector: 'list-aplic-discursive-question',
  templateUrl: './discursive-question.component.html',
  styleUrls: ['./discursive-question.component.scss']
})
export class DiscursiveQuestionComponent implements OnInit {

  @Input() questions: Question[];

  constructor() {
  }

  ngOnInit() {
  }

}
