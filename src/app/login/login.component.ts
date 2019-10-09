import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {LoadingService} from "../services/loading.service";

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
  ) {
  }

  ngOnInit() {
    if (this._loginService.readLoggedUser()) {
      this._router.navigate(['my-profile']);
    }
  }

  signIn() {
    const login = {
      email: this.email,
      password: this.password
    };
    this._loadingService.processing = true;
    this._loginService.login(login).finally(() => {this._loadingService.processing = false});
  }

  signUp() {
    this._router.navigate(['sign-up']);
  }

}
