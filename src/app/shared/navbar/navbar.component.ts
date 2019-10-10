import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParticipateClassroomComponent } from 'src/app/participate-classroom/participate-classroom.component';
import { LoginService } from "../../services/login.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'list-aplic-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private readonly _loginService: LoginService,
    private readonly _notificationsService: NotificationsService,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModalParticipateClassroom() {
    const modalRef = this.modalService.open(ParticipateClassroomComponent);
  }

  logout() {
    this._loginService.logout();
  }
}
