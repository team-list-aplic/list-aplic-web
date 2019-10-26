import { Component, OnInit } from '@angular/core';
import { Classroom } from '../models/classroom.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../services/classroom.service';
import { NotificationsService } from 'angular2-notifications';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'list-aplic-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.scss']
})
export class ViewClassroomComponent implements OnInit {

  classroom: Classroom = {};
  response: any;

  constructor(private readonly _route: ActivatedRoute,
    private readonly _classroomService: ClassroomService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService,
    private readonly _router: Router) {
    this.classroom.id = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.classroom.id !== null) {
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


}
