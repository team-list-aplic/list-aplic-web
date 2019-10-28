import { Component, OnInit } from '@angular/core';
import { Classroom } from '../models/classroom.model';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '../services/classroom.service';
import { NotificationsService } from 'angular2-notifications';
import { LoadingService } from '../services/loading.service';
import { NgForm } from '@angular/forms';
import { List } from '../models/list.model';
import { ListService } from '../services/list.service';
import { LoginService } from '../services/login.service';

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
  lists: List[];

  constructor(private readonly _route: ActivatedRoute,
    private readonly _classroomService: ClassroomService,
    private readonly _listService: ListService,
    private readonly _loginService: LoginService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService) {
    this.classroom.id = this._route.snapshot.paramMap.get('id');
    this.user = this._loginService.readLoggedUser();
  }

  ngOnInit(): void {
    if (this.classroom.id !== null) {
      this.typeFilter = "Lista Aleatória";
      this.loadDataClassroom(this.classroom.id);
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
            this._notificationsService.error('Ocorreu um erro', this.response.error.message, { timeOut: 3000 });
          }
          else if (this.response.error !== undefined && this.response.error.fieldErrors.length > 0) {
            this.response.error.fieldErrors.forEach(error => {
              this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
            });
          }
          //Success
          else {
            this.showResult = true;
            this.lists = data;
          }

          this._loadingService.processing = false;
        });
    }
    finally {
      this._loadingService.processing = false;
    }
  }
}
