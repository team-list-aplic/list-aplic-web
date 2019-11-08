import {Component, OnInit, TemplateRef} from '@angular/core';
import {StudentService} from "../services/student.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Student} from "../models/student.model";
import {LoginService} from "../services/login.service";
import {NotificationsService} from "angular2-notifications";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'list-aplic-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  student: Student = {};
  modalRef: BsModalRef;

  constructor(private readonly _loginService: LoginService) { }

  ngOnInit() {
    this.student = this._loginService.readLoggedUser();
  }
}
