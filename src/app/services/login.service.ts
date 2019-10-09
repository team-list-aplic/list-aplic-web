import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from "../models/student.model";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";

const LOGGED_USER_KEY = 'loggedUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Base Url
  private readonly _baseurl = 'https://list-aplic-api.herokuapp.com/api';

  // Http Headers
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: {}
  };

  constructor(private readonly _http: HttpClient,
              private readonly _notificationsService: NotificationsService,
              private readonly _router: Router,) { }

  async login(login: Object) {
    this._httpOptions.params = login;
    const studentDto = await this._http.post<Student>(this._baseurl + '/login/', JSON.stringify(login), this._httpOptions).toPromise();
    this._storingStudent(studentDto);
    this._router.navigate(['my-profile']);
  }

  private _storingStudent(student: Student) {
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(student));
    this._notificationsService.success('Entrando...', 'logado');
  }

  logout() {
    localStorage.clear();
    this._notificationsService.success('Saindo...', 'Deslogado');
    this._router.navigate(['login']);
  }

  readLoggedUser(): Student {
    return JSON.parse(localStorage.getItem(LOGGED_USER_KEY));
  }
}
