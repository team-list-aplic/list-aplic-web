import { Component, OnInit, TemplateRef } from '@angular/core';
import { Classroom } from '../models/classroom.model';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '../services/classroom.service';
import { NotificationsService } from 'angular2-notifications';
import { LoadingService } from '../services/loading.service';
import { NgForm } from '@angular/forms';
import { List } from '../models/list.model';
import { ListService } from '../services/list.service';
import { LoginService } from '../services/login.service';
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Subject } from "../models/subject.model";
import { Time } from '@angular/common';
import { DifficultyLevel } from "../models/enums/difficulty-level";

@Component({
  selector: 'list-aplic-search-classroom',
  templateUrl: './search-classroom.component.html',
  styleUrls: ['./search-classroom.component.scss']
})
export class SearchClassroomComponent implements OnInit {

  classroom: Classroom = {};
  response: any;
  user: any;

  nameList: string;
  subjectFilter: string;
  filterSubject = false;
  showResult: boolean = false;
  lists: List[] = [];
  currentList: List;

  subjects: Subject[] = [];
  selectedGroup?: string;
  initialDateAplication: Date;
  finalDateAplication: Date;
  initialTimeAplication: Time;
  finalTimeAplication: Time;

  showGroupWarning = false;
  showSubjectWarning = false;

  modalRef: BsModalRef;

  constructor(private readonly _route: ActivatedRoute,
              private readonly _classroomService: ClassroomService,
              private readonly _listService: ListService,
              private readonly _loginService: LoginService,
              private readonly _notificationsService: NotificationsService,
              private readonly _loadingService: LoadingService,
              private readonly _modalService: BsModalService) {
    this.classroom.id = this._route.snapshot.paramMap.get('id');
    this.user = this._loginService.readLoggedUser();
  }

  get noGroupSelected(): boolean {
    return !this.selectedGroup || this.selectedGroup.length <= 0;
  }

  ngOnInit(): void {
    if (this.classroom.id !== null) {
      this.loadDataClassroom(this.classroom.id);
    }
    this._loadSubjects();
  }

  async submitFilter(form: NgForm) {
    try {
      this._loadingService.processing = true;

      if (!this.filterSubject) {
        this.subjectFilter = '';
      } else {
        if (!this.subjectFilter || this.subjectFilter.length <= 0 || this.subjectFilter === 'undefined') {
          this.showSubjectWarning = true;
          return;
        } else {
          this.showSubjectWarning = false;
        }
      }
      this._listService.findListsByFilter(this.nameList, this.subjectFilter)
        .then(data => {
          this.response = data;

          //Error
          if (this.response.error !== undefined && this.response.error.message != undefined) {
            this._notificationsService.error('Ocorreu um erro', this.response.error.message, {timeOut: 3000});
          } else if (this.response.error !== undefined && this.response.error.fieldErrors.length > 0) {
            this.response.error.fieldErrors.forEach(error => {
              this._notificationsService.error('Ocorreu um erro', error.message, {timeOut: 3000});
            });
          }
          //Success
          else {
            this.lists = data;
          }

          this._loadingService.processing = false;
        });
    } finally {
      this._loadingService.processing = false;
      this.showResult = true;
    }
  }

  loadDataClassroom(id) {
    this._loadingService.processing = true;

    this._classroomService.findById(id)
      .then(data => {
        this.response = data;

        //Error
        if (this.response.error !== undefined && this.response.error.fieldErrors.length > 0) {
          this.response.error.fieldErrors.forEach(error => {
            this._notificationsService.error('Ocorreu um erro', error.message, {timeOut: 3000});
          });
        }
        //Success
        else {
          this.classroom = data;
        }

        this._loadingService.processing = false;
      });
  }

  async confirm() {
    if (this.noGroupSelected) {
      this.showGroupWarning = true;
      return;
    }
    try {
      this._loadingService.processing = true;
      const value = await this._listService.sendListToGroup(this.selectedGroup, this.classroom.id, this.currentList.id);
      this._notificationsService.success('Lista enviada', '', { timeOut: 3000 });
      this.modalRef.hide();
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
  }

  openListModal(template: TemplateRef<any>, list: List) {
    this.currentList = list;
    this._modalService.config.class = "modal-lg";
    this.modalRef = this._modalService.show(template);
  }

  openApplyListModal(template: TemplateRef<any>, list: List) {
    this.currentList = list;
    this._modalService.config.class = "modal-lg";
    this.modalRef = this._modalService.show(template);
  }

  private async _loadSubjects() {
    this.subjects = await this._listService.getAllSubjects();
  }

  translateDifficultyLevel(level: number = 1) {
    return Object.values(DifficultyLevel)[level - 1];
  }
}
