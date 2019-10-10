import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Classroom } from '../models/classroom.model';

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

  constructor(private http: HttpClient) { }

  save(classroom: Classroom): Promise<Classroom> {
    return this.http.post<Classroom>(this._baseurl + '/classrooms/', JSON.stringify(classroom), this._httpOptions).toPromise();
  }

  findAll(): Promise<Classroom[]> {
    return this.http.get<Classroom[]>(this._baseurl + '/classrooms/').toPromise();
  }

  update(classroom: Classroom): Promise<Classroom> {
    return this.http.put<Classroom>(this._baseurl + '/classrooms/' + classroom.id, JSON.stringify(classroom), this._httpOptions).toPromise();
  }

  delete(id: string): void {
    this.http.delete<Classroom>(this._baseurl + '/classrooms/' + id, this._httpOptions).toPromise();
  }

  findById(id: string): Promise<Classroom> {
    return this.http.get<Classroom>(this._baseurl + '/classrooms/' + id, this._httpOptions).toPromise();
  }
}