import { Component, ElementRef, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Classroom } from '../models/classroom.model';
import { ClassroomService } from '../services/classroom.service';
import { List } from '../models/list.model';
import { ListService } from '../services/list.service';
import { LoadingService } from '../services/loading.service';
import { LoginService } from '../services/login.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'list-aplic-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.scss']
})
export class ViewClassroomComponent implements OnInit {

  classroom: Classroom = {};
  pendingList: List[];
  list: any;
  questions: any;
  user: any;
  response: any;

  constructor(private readonly _route: ActivatedRoute,
    private readonly _classroomService: ClassroomService,
    private readonly _listService: ListService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService,
    private readonly _loginService: LoginService,
    private el: ElementRef) {
    this.classroom.id = this._route.snapshot.paramMap.get('id');
    this.user = this._loginService.readLoggedUser();
  }

  ngOnInit(): void {
    if (this.classroom.id !== null) {
      this.loadDataClassroom(this.classroom.id);
    }
    this.listPendingLists();
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

  listPendingLists() {
    this._loadingService.processing = true;

    this._listService.findPendingLists(this.user.id)
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
          this.pendingList = data;
        }
      }).finally(() => this._loadingService.processing = false);
  }

  async sendAnswers() {
    console.log(this.list);
    let validate = true;
    if (this.list && this.list.questions) {
      this.list.questions.forEach(question => {
        if (!question.answer) {
          validate = false;
          return;
        }
      });
    }

    if (validate) {
      try {
        this._loadingService.processing = true;
        await this._listService.sendAnswers(this.list, this.user.id);
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

    let myTagActive = this.el.nativeElement.querySelector(".active");
    let myTabActive = this.el.nativeElement.querySelector(".show");

    myTagActive.classList.remove('active');
    myTabActive.classList.remove('active');
    myTabActive.classList.remove('show');

    let tab = this.el.nativeElement.querySelector("." + e.currentTarget.id);

    e.currentTarget.classList.add('active');
    tab.classList.add('active');
    tab.classList.add('show');
  }
}
