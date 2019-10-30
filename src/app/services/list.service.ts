import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {List} from '../models/list.model';

const ALLCLASSROOM = 'allClassroom';

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

  findListsByFilter(aleatory: boolean, name: string, subjectCode: string, user: string): Promise<List[]> {
    return new Promise(resolve => {
      this._http.get<List[]>(this._baseurl + '/lists/', {
        params: {
          aleatory: aleatory.toString(),
          name,
          subjectCode,
          user
        }
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
}
