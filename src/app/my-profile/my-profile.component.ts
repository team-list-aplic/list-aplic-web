import {Component, OnInit, TemplateRef} from '@angular/core';
import {StudentService} from "../services/student.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Student} from "../models/student.model";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'list-aplic-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  student: Student = {};
  modalRef: BsModalRef;

  constructor(private readonly _studentService: StudentService,
              private readonly _modalService: BsModalService,
              private readonly _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.student = this._loginService.readLoggedUser();
  }

  deleteProfile(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  confirm() {
    this._studentService.delete(this.student.id);
    this.modalRef.hide();
    this._loginService.logout();
  }

  decline() {
    this.modalRef.hide();
  }
}
