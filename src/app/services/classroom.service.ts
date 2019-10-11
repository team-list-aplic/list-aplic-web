import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Classroom } from '../models/classroom.model';
import { parse } from 'querystring';
import { Student } from '../models/student.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  // Base Url
  private readonly _baseurl = 'https://list-aplic-api.herokuapp.com/api';

  // Http Headers
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { 
  }

  save(classroom: Classroom): Promise<Classroom> {
    return new Promise(resolve => {
      this.http.post(this._baseurl + '/classrooms/', JSON.stringify(classroom), this._httpOptions)
        .subscribe(data => {
          resolve(data);
        },
          err => {
            resolve(err);
          });
    });
  }

  findAll(): Promise<Classroom[]> {
    return this.http.get<Classroom[]>(this._baseurl + '/classrooms/', this._httpOptions).toPromise();
  }

  findAllByInstructorId(id: string): Promise<Classroom[]> {
    return this.http.get<Classroom[]>(this._baseurl + '/classrooms/instructor/' + id, this._httpOptions).toPromise();
  }

  findAllByStudentId(id: string): Promise<Classroom[]> {
    return this.http.get<Classroom[]>(this._baseurl + '/classrooms/student/' + id, this._httpOptions).toPromise();
  }

  update(classroom: Classroom): Promise<Classroom> {
    return new Promise(resolve => {
      this.http.put<Classroom>(this._baseurl + '/classrooms/' + classroom.id, JSON.stringify(classroom), this._httpOptions)
        .subscribe(data => {
          resolve(data);
        },
          err => {
            resolve(err);
          });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise(resolve => {
      this.http.delete<Classroom>(this._baseurl + '/classrooms/' + id, this._httpOptions)
        .subscribe(data => {
          resolve(data);
        },
          err => {
            resolve(err);
          });
    });
  }

  findById(id: string): Promise<Classroom> {
    return this.http.get<Classroom>(this._baseurl + '/classrooms/' + id, this._httpOptions).toPromise();
  }
}