import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { Classroom } from '../models/classroom.model';
import { ClassroomService } from '../services/classroom.service';
import { LoadingService } from '../services/loading.service';
import { LoginService } from '../services/login.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Student } from '../models/student.model';

@Component({
  selector: 'list-aplic-list-classroom',
  templateUrl: './list-classroom.component.html',
  styleUrls: ['./list-classroom.component.scss']
})
export class ListClassroomComponent implements OnInit {

  listClassrooms: Classroom[];
  listStudents: Student[];
  response: any;
  modalRef: BsModalRef;
  codeForShow: string;
  classroomName: string;

  accessUser: boolean;
  user: any;

  constructor(private readonly _router: Router,
    private readonly _classroomService: ClassroomService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService,
    private readonly _modalService: BsModalService,
    private readonly _loginService: LoginService) {
    this.accessUser = this._loginService.checkAccessUser();
    this.user = this._loginService.readLoggedUser();
  }

  ngOnInit() {
    this.listAllClassroom();
  }

  listAllClassroom() {
    this._loadingService.processing = true;

    if (this.accessUser) {
      this._classroomService.findAllByInstructorId(this.user.id)
        .then(data => {
          this.response = data;

          //Error
          if (this.response.error !== undefined && this.response.error.fieldErrors.length > 0) {
            this.response.error.fieldErrors.forEach(error => {
              this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
            });
          }
          //Success
          else {
            this.listClassrooms = data;
          }
        }).finally(() => this._loadingService.processing = false);
    }
    else {
      this._classroomService.findAllByStudentId(this.user.id)
        .then(data => {
          this.response = data;

          //Error
          if (this.response.error !== undefined && this.response.error.fieldErrors.length > 0) {
            this.response.error.fieldErrors.forEach(error => {
              this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
            });
          }
          //Success
          else {
            this.listClassrooms = data;
          }
        }).finally(() => this._loadingService.processing = false);
      ;
    }
  }

  editClassroom(id) {
    this._router.navigate(['/edit-classroom', { id: id }]);
  }

  decline() {
    this.modalRef.hide();
  }

  showClassroomCode(template: TemplateRef<any>, code) {
    this.codeForShow = code;
    this.modalRef = this._modalService.show(template);
  }

  showStudentsClassroom(template: TemplateRef<any>, id, name) {
    this.classroomName = name;
    this._modalService.config.class = "modal-lg";
    this.modalRef = this._modalService.show(template);

    this.listStudents = [
      {
        name: "Natália Lopes da Silva",
        email: "natalia@gmail.com"
      },
      {
        name: "Natália Lopes da Silva",
        email: "natalia@gmail.com"
      },
      {
        name: "Natália Lopes da Silva",
        email: "natalia@gmail.com"
      },
      {
        name: "Natália Lopes da Silva",
        email: "natalia@gmail.com"
      },
      {
        name: "Natália Lopes da Silva",
        email: "natalia@gmail.com"
      }
    ]

  }
}
