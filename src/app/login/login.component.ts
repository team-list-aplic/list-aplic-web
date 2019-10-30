import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {LoadingService} from "../services/loading.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'list-aplic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private readonly _router: Router,
              private readonly _loginService: LoginService,
              private readonly _loadingService: LoadingService,
              private readonly _notificationsService: NotificationsService,
  ) {
  }

  ngOnInit() {
    if (this._loginService.readLoggedUser()) {
      this._router.navigate(['my-profile']);
    }
  }

  async signIn() {
    const login = {
      email: this.email,
      password: this.password
    };
    this._loadingService.processing = true;
    try {
      const studentDto = await this._loginService.login(login);
      this._loginService.storingStudent(studentDto);
      this._router.navigate(['my-profile']);
      this._notificationsService.success('Entrando...');
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

  signUp() {
    this._router.navigate(['sign-up']);
  }

}
