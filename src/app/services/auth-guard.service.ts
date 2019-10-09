import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private readonly _loginService: LoginService,
              private readonly _router: Router,
  ) { }

  canActivate() {
    if (!this._loginService.readLoggedUser()) {
      this._router.navigate(['login']);
      return false;
    }
    return true;
  }
}
