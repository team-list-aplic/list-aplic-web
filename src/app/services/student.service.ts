import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // Base Url
  private readonly _baseurl = 'https://list-aplic-api.herokuapp.com/api';

  // Http Headers
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  save(student: Student): Promise<Student> {
    return this.http.post<Student>(this._baseurl + '/students/', JSON.stringify(student), this._httpOptions).toPromise();
  }

  findAll(): Promise<Student[]> {
    return this.http.get<Student[]>(this._baseurl + '/students/').toPromise();
  }

  update(student: Student): Promise<Student> {
    return this.http.put<Student>(this._baseurl + '/students/' + student.id, JSON.stringify(student), this._httpOptions).toPromise();
  }

  delete(id: string): void {
    this.http.delete<Student>(this._baseurl + '/students/' + id, this._httpOptions).toPromise();
  }

  findById(id: string): Promise<Student> {
    return this.http.get<Student>(this._baseurl + '/students/' + id, this._httpOptions).toPromise();
  }
}
