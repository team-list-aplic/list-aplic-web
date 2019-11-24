import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { Subject } from "../models/subject.model";
import { environment } from '../../environments/environment';
import { Apply } from '../models/apply.model';
import { ApplicationListStatus } from "../models/enums/application-list-status";
import { KnowledgeAreas } from "../models/knowledge-areas.model";
import { FiltersList } from "../models/filters-list.model";

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
  private readonly _baseurl = environment.apiUrl;

  // Http Headers
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams(),
  };

  constructor(private readonly _http: HttpClient) {
  }

  findListsByFilter(filtersList: FiltersList): Promise<List[]> {
    const options = this._httpOptions;
    if (filtersList.knowledgeAreaCode) {
      options.params = options.params.append('knowledgeAreaCode', filtersList.knowledgeAreaCode);
    }
    if (filtersList.subjectCode) {
      options.params = options.params.append('subjectCode', filtersList.subjectCode);
    }
    if (filtersList.difficultyLevel) {
      options.params = options.params.append('difficultyLevel', String(filtersList.difficultyLevel));
    }
    if (filtersList.answerTime) {
      options.params = options.params.append('answerTime', String(filtersList.answerTime));
    }
    if (filtersList.tags && filtersList.tags.length > 0) {
      options.params = options.params.append('tags', JSON.stringify(filtersList.tags));
    }
    return this._http.get<List[]>(this._baseurl + '/lists/', options).toPromise();
  }

  findPendingLists(studentId: string): Promise<List[]> {
    const params = {
      studentId: studentId
    };
    return new Promise(resolve => {
      this._http.get<List[]>(this._baseurl + '/lists/pending', {
        params
      }).subscribe(data => {
          resolve(data);
        },
        err => {
          resolve(err);
        });
    });
  }

  sendListToGroup(apply: any): Promise<Apply> {
    return this._http.post<Apply>(this._baseurl + '/lists/apply', JSON.stringify(apply), this._httpOptions).toPromise();
  }

  sendAnswers(list: any, studentId: string): Promise<any> {
    return this._http.post<List[]>(this._baseurl + '/lists/answer?studentId=' + studentId, list, this._httpOptions).toPromise();
  }

  getAllSubjects(): Promise<Subject[]> {
    return this._http.get<Subject[]>(this._baseurl + '/subjects', this._httpOptions).toPromise();
  }

  getAllKnowledgeAreas(): Promise<KnowledgeAreas[]> {
    return this._http.get<KnowledgeAreas[]>(this._baseurl + '/knowledge-areas', this._httpOptions).toPromise();
  }

  getListsByClassroom(classroomId: string, status?: ApplicationListStatus): Promise<List[]> {
    const options = {
      headers: this._httpOptions.headers,
      params: status ? { status: status.toString() } : null,
    };

    return this._http.get<List[]>(this._baseurl + '/lists/applications/' + classroomId, options).toPromise();
  }

  finishListApplication(listApplicationId: string): Promise<any> {
    return this._http.get<any>(this._baseurl + '/lists/finish/' + listApplicationId, this._httpOptions).toPromise();
  }

}
