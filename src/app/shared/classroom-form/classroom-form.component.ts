import { Component, Input } from '@angular/core';
import { Classroom } from 'src/app/models/classroom.model';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationsService } from 'angular2-notifications';
import { ClassroomService } from 'src/app/services/classroom.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'list-aplic-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.scss']
})
export class ClassroomFormComponent {
 
  @Input() actionCreate: boolean;

  class: Classroom = {};

  constructor(private readonly _classroomService: ClassroomService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService,
  ) {
  }

  submitForm(form: NgForm) {
    // try {
    //   this._loadingService.processing = true;
    //   if (this.actionCreate) {
    //     this._signUp();
    //   } else {
    //     this._editStudent();
    //   }
    //   form.reset();
    // } catch (error) {
    //   (error.error.fieldErrors || []).forEach(error => {
    //     this._notificationsService.error('Ocorreu um erro', error.message);
    //   });
    // }finally {
    //   this._loadingService.processing = false;
    // }
  }

}
