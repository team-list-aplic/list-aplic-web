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

  constructor(private readonly _studentService: StudentService,
              private readonly _modalService: BsModalService,
              private readonly _loginService: LoginService,
              private readonly _notificationsService: NotificationsService,
              private readonly _loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.student = this._loginService.readLoggedUser();
  }

  deleteProfile(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  async confirm() {
    try {
      this._loadingService.processing = true;
      const student = await this._studentService.delete(this.student.id);
      this.modalRef.hide();
      this._loginService.logout();
    } catch (error) {
      if (!error.error.fieldErros || error.error.fieldErros == []) {
        this._notificationsService.error('Ocorreu um erro', error.error.message, { timeOut: 3000 });
      } else {
        (error.error.fieldErrors || []).forEach(error => {
          this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
        });
      }
    } finally {
      this._loadingService.processing = false;
    }
  }

  decline() {
    this.modalRef.hide();
  }
}
