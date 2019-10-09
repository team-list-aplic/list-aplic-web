import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParticipateClassroomComponent } from 'src/app/participate-classroom/participate-classroom.component';

@Component({
  selector: 'list-aplic-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModalParticipateClassroom() {
    const modalRef = this.modalService.open(ParticipateClassroomComponent);
  }
}
