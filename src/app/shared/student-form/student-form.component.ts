import { Component, Input, OnInit } from '@angular/core';
import { Student } from "../../models/student.model";
import { StudentService } from "../../services/student.service";
import { NotificationsService } from "angular2-notifications";
import { LoadingService } from "../../services/loading.service";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'list-aplic-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  @Input() actionCreate: boolean;

  student: Student = {};
  repeatPassword?: string;

  constructor(private readonly _studentService: StudentService,
    private readonly _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService,
    private readonly _loginService: LoginService,
    private readonly _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.student = this._loginService.readLoggedUser() || {};
  }

  submitForm() {
    if (this.actionCreate) {
      this._signUp();
    } else {
      this._editStudent();
    }
  }

  private async _signUp() {
    try {
      this._loadingService.processing = true;
      const student = await this._studentService.save(this.student);
      this._notificationsService.success('Discente Criado', student.name, { timeOut: 3000 });
      this._router.navigate(['login']);
    } catch (error) {
      (error.error.fieldErrors || []).forEach(error => {
        this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
      });
    } finally {
      this._loadingService.processing = false;
    }
  }

  private async _editStudent() {
    try {
      this._loadingService.processing = true;
      const student = await this._studentService.update(this.student);
      this._notificationsService.success('Discente Editado', student.name, { timeOut: 3000 });
      this._router.navigate(['my-profile']);
    } catch (error) {
      (error.error.fieldErrors || []).forEach(error => {
        this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
      });
    } finally {
      this._loadingService.processing = false;
    }
  }

  get arePasswordDiff(): boolean {
    if (this.student && this.repeatPassword && this.student.password && this.student.password !== this.repeatPassword) {
      return true;
    }
    return false;
  }

}
