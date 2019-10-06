import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'list-aplic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly _router: Router) { }

  ngOnInit() {
  }

  signIn() {

  }

  signUp() {
    this._router.navigateByUrl('/sign-up');
  }

}
