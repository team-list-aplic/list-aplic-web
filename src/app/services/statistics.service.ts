import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Statistic } from '../models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  // Base Url
  private readonly _baseurl = environment.apiUrl;

  // Http Headers
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  async getAnsweredListsPercentByClassroom(classroomId: string): Promise<Statistic> {
    return this.http.get<Statistic>(this._baseurl + 'statistics/classroom/' + classroomId, this._httpOptions).toPromise();
  }

  async getTopQuestionsByInstructor(instructorId: string): Promise<Statistic> {
    return this.http.get<Statistic>(this._baseurl + 'statistics/instructor/' + instructorId, this._httpOptions).toPromise();
  }
}
