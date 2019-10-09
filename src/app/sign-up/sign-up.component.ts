import {Component, OnInit} from '@angular/core';
import {Student} from "../models/student.model";
import {StudentService} from "../services/student.service";
import {NotificationsService} from "angular2-notifications";
import {LoadingService} from "../services/loading.service";
import {Form, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'list-aplic-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private readonly _router: Router,
              private readonly _loginService: LoginService,) {
  }

  ngOnInit() {
    if (this._loginService.readLoggedUser()) {
      this._router.navigate(['my-profile']);
    }
  }

}
