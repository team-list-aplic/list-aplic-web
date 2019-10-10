import { Component, Input } from '@angular/core';
import { Classroom } from 'src/app/models/classroom.model';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationsService } from 'angular2-notifications';
import { ClassroomService } from 'src/app/services/classroom.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list-aplic-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.scss']
})
export class ClassroomFormComponent {

  @Input() actionCreate: boolean;
  classroom: Classroom = {};

  constructor(private readonly _classroomService: ClassroomService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService,
    private readonly _router: Router
  ) {
  }

  submitForm(form: NgForm) {
    try {
      this._loadingService.processing = true;
      if (this.actionCreate) {
        this._addClassroom();
      } else {
        this._editClassroom();
      }
      form.reset();
    } catch (error) {
      (error.error.fieldErrors || []).forEach(error => {
        this._notificationsService.error('Ocorreu um erro', error.message);
      });
    } finally {
      this._loadingService.processing = false;
    }
  }

  private async _addClassroom() {
    const classroom = await this._classroomService.save(this.classroom);
    this._notificationsService.success('Turma Criada', classroom.name);
    this._router.navigate(['list-classroom']);
  }

  private async _editClassroom() {
    const classroom = await this._classroomService.update(this.classroom);
    this._notificationsService.success('Turma Editada', classroom.name);
    this._router.navigate(['list-classroom']);
  }

}
