import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'list-aplic-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  accessUser: boolean;

  constructor(private readonly _loginService: LoginService) {
    this.accessUser = this._loginService.checkAccessUser();
  }

  ngOnInit() {
  }

  logout() {
    this._loginService.logout();
  }
}
