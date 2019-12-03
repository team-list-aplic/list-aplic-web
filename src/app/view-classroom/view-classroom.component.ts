import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Classroom } from '../models/classroom.model';
import { ClassroomService } from '../services/classroom.service';
import { List } from '../models/list.model';
import { ListService } from '../services/list.service';
import { LoadingService } from '../services/loading.service';
import { LoginService } from '../services/login.service';
import { NotificationsService } from 'angular2-notifications';
import { ApplicationListStatus } from '../models/enums/application-list-status';

@Component({
  selector: 'list-aplic-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.scss']
})
export class ViewClassroomComponent implements OnInit {

  @ViewChild("myDiv", { static: true }) divView: ElementRef;

  classroom: Classroom = {};

  newLists: List[] = [];
  startedLists: List[] = [];
  finishedLists: List[] = [];

  list: any;
  questions: any;
  user: any;
  response: any;

  constructor(private readonly _route: ActivatedRoute,
    private readonly _classroomService: ClassroomService,
    private readonly _listService: ListService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService,
    private readonly _loginService: LoginService) {
    this.classroom.id = this._route.snapshot.paramMap.get('id');
    this.user = this._loginService.readLoggedUser();
  }

  ngOnInit(): void {
    if (this.classroom.id !== null) {
      this.loadDataClassroom(this.classroom.id);
    }

    this.loadLists();
    this.list = null;
    this.questions = null;
  }

  loadDataClassroom(id) {
    this._loadingService.processing = true;

    this._classroomService.findById(id)
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
          this.classroom = data;
        }

        this._loadingService.processing = false;
      });
  }

  loadLists() {
    this._loadingService.processing = true;

    this._listService.findLists(this.user.id, this.classroom.id)
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
          this.newLists = [];
          this.startedLists = [];
          this.finishedLists = [];

          //Separa as listas por status
          data.forEach(list => {
            //Se a lista estiver disponível para ser respondida ela pode ser vista de duas formas:
            if (list.status === ApplicationListStatus.EM_ANDAMENTO) {
              let started = false;

              list.questions.forEach(question => {
                if (question.answer !== undefined) {
                  started = true;
                }
              });

              //lista nova
              if (!started) {
                this.newLists.push(list);
              }
              //lista começada
              else {
                this.startedLists.push(list);
              }
            }
            else if (list.status === ApplicationListStatus.ENCERRADA) {
              this.finishedLists.push(list);
            }
          });
        }
      }).finally(() => this._loadingService.processing = false);
  }

  async sendAnswers(status: string) {
    let validate = true;

    //Só valida as questões se for um envio de respostas completo
    if (status === 'SAVE') {
      if (this.list && this.list.questions) {
        this.list.questions.forEach(question => {
          if (!question.answer) {
            validate = false;
            return;
          }
        });
      }
    }

    this.list.questions.forEach(question => {
      question.expectedAnswers = null;
    });

    debugger
    if (validate) {
      try {
        this._loadingService.processing = true;
        await this._listService.sendAnswers(this.list, status, this.user.id);
        this._notificationsService.success('Respostas enviadas', '', { timeOut: 3000 });
        this.ngOnInit();
      } catch (error) {
        if (!error.error.fieldErrors || error.error.fieldErrors === []) {
          this._notificationsService.error('Ocorreu um erro', error.error.message, { timeOut: 3000 });
        } else {
          (error.error.fieldErrors || []).forEach(error => {
            this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
          });
        }
      } finally {
        this._loadingService.processing = false;
      }
    } else {
      this._notificationsService.error('Algumas perguntas ainda não foram respondidas.', '', { timeOut: 3000 });
    }
  }

  tab(e, list) {
    this.list = list;
    this.questions = list ? list.questions : [];

    e.preventDefault();

    let myTagActive = this.divView.nativeElement.querySelector(".active");
    let myTabActive = this.divView.nativeElement.querySelector(".show");

    if (myTabActive != null) {
      myTagActive.classList.remove('active');
      myTabActive.classList.remove('active');
      myTabActive.classList.remove('show');
    }

    e.currentTarget.classList.add('active');

    let tab = this.divView.nativeElement.querySelector("." + e.currentTarget.id);

    if (tab != null) {
      tab.classList.add('active');
      tab.classList.add('show');
    }
  }
}
