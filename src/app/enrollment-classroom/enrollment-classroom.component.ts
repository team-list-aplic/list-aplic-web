import {Component, OnInit} from '@angular/core';
import {Classroom} from '../models/classroom.model';
import {NgForm} from '@angular/forms';
import {StudentService} from '../services/student.service';
import {NotificationsService} from 'angular2-notifications';
import {LoadingService} from '../services/loading.service';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'list-aplic-enrollment-classroom',
  templateUrl: './enrollment-classroom.component.html',
  styleUrls: ['./enrollment-classroom.component.scss']
})
export class EnrollmentClassroomComponent implements OnInit {

  classroom: Classroom = {};
  user: any;
  response: any;

  constructor(private readonly _studentService: StudentService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService,
    private readonly _router: Router,
    private readonly _loginService: LoginService, ) {
    this.user = this._loginService.readLoggedUser();
  }

  ngOnInit() {
  }

  async submitForm(form: NgForm) {
    try {
      this._loadingService.processing = true;
      this._studentService.enrollmentStudentInClassroom(this.user.id, this.classroom.code)
        .then(data => {
          debugger
          this.response = data;

          //Error
          if (this.response !== null && this.response.error !== undefined) {
            if (this.response.error.message != undefined) {
              //Trata erro: Turma não encontrada
              if (this.response.error.message === "Classroom not found") {
                this._notificationsService.error('Ocorreu um erro', "Turma não encontrada...", { timeOut: 3000 });
              }
              else {
                this._notificationsService.error('Ocorreu um erro', this.response.error.message, { timeOut: 3000 });
              }
            }
            else {
              this.response.error.fieldErrors.forEach(error => {
                this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
              });
            }
          }
          //Success
          else {
            this._notificationsService.success('Você entrou na turma: ', this.classroom.code, { timeOut: 3000 });
            this._router.navigate(['list-classroom']);
          }
        });
    }
    finally {
      this._loadingService.processing = false;
    }
  }
}