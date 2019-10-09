import { Component } from '@angular/core';
import { StudentService } from './services/student.service';
import { Student } from './models/student.model';
import {LoginService} from "./services/login.service";

enum View {
  CREATE,
  LIST,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly _loginService: LoginService) {}

  get isLoggedUser(): boolean {
    return !!this._loginService.readLoggedUser();
  }
}
