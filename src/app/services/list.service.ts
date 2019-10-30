import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {List} from '../models/list.model';
import {Subject} from "../models/subject.model";

const ALLCLASSROOM = 'allClassroom';

interface SearchListOptions {
  name?: string;
  subjectCode?: string;
}

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

  constructor(private readonly _http: HttpClient) {
  }

  findListsByFilter(name: string, subjectCode: string): Promise<List[]> {
    console.log(subjectCode);
    const params = {};
    if (name && name.length > 0) {
      (params as SearchListOptions).name = name;
    }
    if (subjectCode && subjectCode.length > 0) {
      (params as SearchListOptions).subjectCode = subjectCode;
    }
    console.log(params);
    return new Promise(resolve => {
      this._http.get<List[]>(this._baseurl + '/lists/', {
        params
      }).subscribe(data => {
        resolve(data);
      },
        err => {
          resolve(err);
        });
    });
  }

  sendListToGroup(group: string, classroomId: string, listId: string): Promise<any> {
    const body = {
      allClassroom: group === ALLCLASSROOM,
      group,
      classroomId,
      listId,
    };
    return this._http.post<List[]>(this._baseurl + '/lists/apply', JSON.stringify(body), this._httpOptions).toPromise();
  }

  getAllSubjects(): Promise<Subject[]> {
    return this._http.get<Subject[]>(this._baseurl + '/subjects', this._httpOptions).toPromise();
  }
}
