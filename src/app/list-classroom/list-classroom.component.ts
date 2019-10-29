import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Component, OnInit, TemplateRef} from '@angular/core';

import {Classroom} from '../models/classroom.model';
import {ClassroomService} from '../services/classroom.service';
import {LoadingService} from '../services/loading.service';
import {LoginService} from '../services/login.service';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
  selector: 'list-aplic-list-classroom',
  templateUrl: './list-classroom.component.html',
  styleUrls: ['./list-classroom.component.scss']
})
export class ListClassroomComponent implements OnInit {

  listClassrooms: Classroom[];
  response: any;
  modalRef: BsModalRef;
  idClassroomDelete: any;
  codeForShow: string;

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
      this._classroomService.findAllByInstructorId('91b4a2dd-1797-48bb-8353-1231888129a2')
        .then(data => {
          this.response = data;

          //Error
          if (this.response.error !== undefined && this.response.error.fieldErrors.length > 0) {
            this.response.error.fieldErrors.forEach(error => {
              this._notificationsService.error('Ocorreu um erro', error.message);
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
              this._notificationsService.error('Ocorreu um erro', error.message);
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

  deleteClassroom(template: TemplateRef<any>, id: any) {
    this.idClassroomDelete = id;
    this.modalRef = this._modalService.show(template);
  }

  async confirm() {
    await this._classroomService.delete(this.idClassroomDelete)
      .then(data => {
        this.response = data;

        //Error
        if (this.response != null && this.response.error !== undefined && this.response.error.fieldErrors.length > 0) {
          this.response.error.fieldErrors.forEach(error => {
            this._notificationsService.error('Ocorreu um erro', error.message, 3000);
          });
        }
        //Success
        else {
          this.modalRef.hide();
          this._notificationsService.success('Turma Excluída');
          this.listAllClassroom();
        }
      });
  }

  decline() {
    this.modalRef.hide();
  }

  showClassroomCode(template: TemplateRef<any>, code) {
    this.codeForShow = code;
    this.modalRef = this._modalService.show(template);
  }
}
