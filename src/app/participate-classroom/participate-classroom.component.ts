import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'list-aplic-participate-classroom',
  templateUrl: './participate-classroom.component.html',
  styleUrls: ['./participate-classroom.component.scss']
})
export class ParticipateClassroomComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
