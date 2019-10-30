import {Component, OnInit, TemplateRef} from '@angular/core';
import {Classroom} from '../models/classroom.model';
import {ActivatedRoute} from '@angular/router';
import {ClassroomService} from '../services/classroom.service';
import {NotificationsService} from 'angular2-notifications';
import {LoadingService} from '../services/loading.service';
import {NgForm} from '@angular/forms';
import {List} from '../models/list.model';
import {ListService} from '../services/list.service';
import {LoginService} from '../services/login.service';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

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
  typeFilter: string;
  showResult: boolean = false;
  lists: List[] = [];
  currentList: List;

  selectedGroup?: string;
  showWarning = false;

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
      this.typeFilter = "Lista Aleatória";
      this.loadDataClassroom(this.classroom.id);
    }
    const mockList: List = {
      id: 'c299c8a0-f235-40a7-bf27-97a434655518',
      name: 'Lista de Prática em Engenharia de Software',
      subjectCode: 'INF0150',
      user: 'professor@ufg.br',
    };
    this.lists.push(mockList);
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

  async submitFilter(form: NgForm) {
    try {
      this._loadingService.processing = true;
      let aleatory: boolean;

      if (this.typeFilter === "Lista Aleatória") {
        aleatory = true;
      } else {
        aleatory = false;
      }

      this._listService.findListsByFilter(aleatory, this.nameList, this.classroom.subjectCode, this.user.email)
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

  openApplyListModal(template: TemplateRef<any>, list: List) {
    this.currentList = list;
    this.modalRef = this._modalService.show(template);
  }

  async confirm() {
    if (this.noGroupSelected) {
      this.showWarning = true;
      return;
    }
    try {
      this._loadingService.processing = true;
      const value = await this._listService.sendListToGroup(this.selectedGroup, this.classroom.id, this.currentList.id);
      this._notificationsService.success('Lista enviada');
    } catch (error) {
      if (!error.error.fieldErrors || error.error.fieldErrors === []) {
        this._notificationsService.error('Ocorreu um erro', error.error.message);
      } else {
        (error.error.fieldErrors || []).forEach(error => {
          this._notificationsService.error('Ocorreu um erro', error.message);
        });
      }
    } finally {
      this._loadingService.processing = false;
    }
  }
}
