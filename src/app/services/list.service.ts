import { Injectable } from '@angular/core';
import { Classroom } from '../models/classroom.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

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

  findListsByFilter(aleatory: boolean, name: string, subjectCode: string, user: string): Promise<List[]> {
    return this.http.get<List[]>(this._baseurl + '/lists/', {
      params: {
        aleatory: aleatory.toString(),
        name: name,
        subjectCode: subjectCode,
        user: user
      }
    }).toPromise();
  }
}
