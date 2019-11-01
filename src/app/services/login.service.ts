import {Injectable} from '@angular/core';
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
    private readonly _router: Router, ) { }

  async login(login: Object): Promise<Student> {
    return await this._http.post<Student>(this._baseurl + '/login/', JSON.stringify(login), this._httpOptions).toPromise();
  }

  storingStudent(student: Student) {
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(student));
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['login']);
  }

  readLoggedUser(): any {
    return JSON.parse(localStorage.getItem(LOGGED_USER_KEY));
  }

  //Retorna true se for docente
  //Retorna false se for discente
  checkAccessUser(): boolean {
    const user = JSON.parse(localStorage.getItem(LOGGED_USER_KEY));
    return user.role !== 'DISCENTE';
  }
}
