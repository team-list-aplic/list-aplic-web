import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { ApplicationListStatus } from "../../models/enums/application-list-status";
import { Classroom } from '../../models/classroom.model';
import { ClassroomService } from '../../services/classroom.service';
import { List } from "../../models/list.model";
import { ListService } from "../../services/list.service";
import { LoadingService } from '../../services/loading.service';
import { LoginService } from '../../services/login.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Statistic } from "../../models/statistic.model";
import { StatisticsService } from "../../services/statistics.service";
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

type IEnumApplicationListStatus<R> = { [key in keyof typeof ApplicationListStatus]: R };

const translatedApplicationStatus: IEnumApplicationListStatus<string> = {
  ENCERRADA: 'Encerrada',
  EM_ANDAMENTO: 'Em andamento',
  NAO_INICIADA: 'Não iniciada',
};

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

  innerHTMLToStatistics = '';

  lists: List[] = [];

  constructor(private readonly _router: Router,
              private readonly _classroomService: ClassroomService,
              private readonly _studentService: StudentService,
              private readonly _notificationsService: NotificationsService,
              private readonly _loadingService: LoadingService,
              private readonly _modalService: BsModalService,
              private readonly _loginService: LoginService,
              private readonly _statisticsService: StatisticsService,
              private readonly _listService: ListService) {
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
    } else {
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

  async viewClassroomAttempt(classroomId: string) {
    try {
      this._loadingService.processing = true;
      const students = await this._studentService.findStudentsByClassroom(classroomId);
      if (students && students.length > 0) {
        this._router.navigate(['/search-classroom', classroomId]);
      } else {
        this._notificationsService.alert('', 'Não é possível aplicar lista a uma turma sem alunos inscritos.', { timeOut: 3000 });
      }
    } catch (error) {
      if (this.response.error !== undefined && this.response.error.fieldErrors.length > 0) {
        this.response.error.fieldErrors.forEach(error => {
          this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
        });
      }
    } finally {
      this._loadingService.processing = false;
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
    this.listStudents = [];

    this._studentService.findStudentsByClassroom(id)
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
          this.listStudents = data;
          this.classroomName = name;

          if (this.listStudents.length === 0) {
            this._notificationsService.warn('Atenção!', "Nenhum aluno se inscreveu nessa turma.", { timeOut: 3000 });
          }
          else {
            this._modalService.config.class = "modal-lg";
            this.modalRef = this._modalService.show(template);
          }
        }
      }).finally(() => this._loadingService.processing = false);
  }

  async openStatisticsModal(template: TemplateRef<any>, classroomId: string) {
    try {
      this._loadingService.processing = true;
      const statistics = await this._statisticsService.getAnsweredListsPercentByClassroom(classroomId);
      this.buildInnerHTMLToStatistics(statistics);
      this.modalRef = this._modalService.show(template);
    } catch (error) {
      (error.error.fieldErrors || []).forEach(error => {
        this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
      });
    } finally {
      this._loadingService.processing = false;
    }
  }

  async openAppliedListsModal(template: TemplateRef<any>, classroomId: string) {
    try {
      this._loadingService.processing = true;
      this.lists = await this._listService.getListsByClassroom(classroomId);
      this._modalService.config.class = "modal-xl";
      this.modalRef = this._modalService.show(template);
    } catch (error) {
      if (error.error && error.error.message) {
        this._notificationsService.error('Ocorreu um erro', error.error.message, { timeOut: 3000 });
      }
      (error.error.fieldErrors || []).forEach(error => {
        this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
      });
    } finally {
      this._loadingService.processing = false;
    }
  }

  private buildInnerHTMLToStatistics(statistic: Statistic) {
    if (statistic && statistic.errorMessage) {
      this.innerHTMLToStatistics =
        `<p>${ statistic.errorMessage }</p>`;
    } else if (statistic) {
      this.innerHTMLToStatistics =
        `<p>Porcentagem de listas respondidas:</p>
        <p><h3 style="text-align: center">${ ((statistic.completionPercentage || 0) * 100).toFixed(2) }%</h3></p>`;
    }
  }

  translateApplicationStatus(status: ApplicationListStatus) {
    return translatedApplicationStatus[status];
  }

  async finishListApplication(list: List) {
    try {
      this._loadingService.processing = true;
      const resp = await this._listService.finishListApplication(list.id);
      list.status = ApplicationListStatus.ENCERRADA;
      this._notificationsService.success('Lista encerrada com sucesso', '', { timeOut: 3000 });
    } catch (error) {
      if (error.error && error.error.message) {
        this._notificationsService.error('Ocorreu um erro', error.error.message, { timeOut: 3000 });
      }
      (error.fieldErrors || []).forEach(error => {
        this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
      });
    } finally {
      this._loadingService.processing = false;
    }
  }

}
