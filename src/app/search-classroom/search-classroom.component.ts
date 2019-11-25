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
import { DatePipe } from '@angular/common';
import { Apply } from '../models/apply.model';
import { DifficultyLevel } from "../models/enums/difficulty-level";
import { KnowledgeAreas } from "../models/knowledge-areas.model";
import { FiltersList } from "../models/filters-list.model";

@Component({
  selector: 'list-aplic-search-classroom',
  templateUrl: './search-classroom.component.html',
  styleUrls: ['./search-classroom.component.scss'],
})
export class SearchClassroomComponent implements OnInit {

  classroom: Classroom = {};
  apply: Apply = {};
  response: any;
  user: any;

  currentTag: string;
  difficultyLevel: number;
  answerTime: number;
  subjectFilter: string;
  knowledgeFilter: string;
  showResult = false;

  tags: string[] = [];
  difficultyLevels = [1, 2, 3, 4, 5];
  subjects: Subject[] = [];
  knowledgeAreas: KnowledgeAreas[] = [];

  lists: List[] = [];
  currentList: List;

  selectedGroup?: string;
  initialDateAplication: string;
  finalDateAplication: string;
  initialTimeAplication: string;
  finalTimeAplication: string;

  validForm = true;

  modalRef: BsModalRef;

  constructor(private readonly _route: ActivatedRoute,
              private readonly _classroomService: ClassroomService,
              private readonly _listService: ListService,
              private readonly _loginService: LoginService,
              private readonly _notificationsService: NotificationsService,
              private readonly _loadingService: LoadingService,
              private readonly _modalService: BsModalService,
              private datePipe: DatePipe) {
    this.classroom.id = this._route.snapshot.paramMap.get('id');
    this.user = this._loginService.readLoggedUser();
  }

  ngOnInit(): void {
    if (this.classroom.id !== null) {
      this.loadDataClassroom(this.classroom.id);
    }
    this._loadSubjects();
    this._loadKnowledgeAreas();

    //Pega a data e hora atual para a parte inicial
    this.initialDateAplication = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    var time = new Date();
    time.setHours(time.getHours() + 1);
    this.initialTimeAplication = this.datePipe.transform(time, "HH:mm");
  }

  checkIsSelected(level: number) {
    if (level === this.difficultyLevel) {
      return { background: '#0056b3' };
    }
  }

  setLevel(level: number) {
    this.difficultyLevel = level === this.difficultyLevel ? null : level;
  }

  addTag(tag: string) {
    this.tags.push(tag.trim());
    this.currentTag = '';
    console.log(this.tags, this.currentTag);
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => {
      return t !== tag;
    });
  }

  async submitFilter(form: NgForm) {
    try {
      this._loadingService.processing = true;

      const filters: FiltersList = {
        subjectCode: this.subjectFilter,
        difficultyLevel: this.difficultyLevel,
        knowledgeAreaCode: this.knowledgeFilter,
        answerTime: this.answerTime,
        tags: this.tags
      };
      this.lists = await this._listService.findListsByFilter(filters);

    } catch (error) {
      if (error.error && error.error.message) {
        this._notificationsService.error('Ocorreu um erro', error.error.message, { timeOut: 3000 });
      } else {
        (error.error.fieldErrors || []).forEach(error => {
          this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
        });
      }
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

  //Valida o formulário de aplicação de lista
  validFormApplyList() {
    if (this.selectedGroup === undefined || this.initialDateAplication === undefined ||
      this.initialTimeAplication === undefined || this.finalDateAplication === undefined ||
      this.finalTimeAplication === undefined) {
      return false;
    } else {
      return true;
    }
  }

  async confirm() {
    //Validação de formulário
    if (!this.validFormApplyList()) {
      this.validForm = false;
      return false;
    } else {
      this.validForm = true;
    }

    try {
      this._loadingService.processing = true;

      //Preenche objeto
      this.apply.allClassroom = true;
      this.apply.classroomId = this.classroom.id;
      this.apply.finalDate = this.finalDateAplication + " " + this.finalTimeAplication + ":00";
      this.apply.group = this.selectedGroup;
      this.apply.listId = this.currentList.id;
      this.apply.startDate = this.initialDateAplication + " " + this.initialTimeAplication + ":00";

      const value = await this._listService.sendListToGroup(this.apply);
      this._notificationsService.success('Lista enviada', '', { timeOut: 3000 });
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
      this.modalRef.hide();
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

  private async _loadKnowledgeAreas() {
    this.knowledgeAreas = await this._listService.getAllKnowledgeAreas();
  }

  translateDifficultyLevel(level: number = 1) {
    return Object.values(DifficultyLevel)[level - 1];
  }
}
