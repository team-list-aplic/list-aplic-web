import {Injectable} from '@angular/core';
import {Student} from '../models/student.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  constructor(private readonly _http: HttpClient) {
  }

  save(student: Student): Promise<Student> {
    return this._http.post<Student>(this._baseurl + '/students/', JSON.stringify(student), this._httpOptions).toPromise();
  }

  findAll(): Promise<Student[]> {
    return this._http.get<Student[]>(this._baseurl + '/students/').toPromise();
  }

  update(student: Student): Promise<Student> {
    return this._http.put<Student>(this._baseurl + '/students/' + student.id, JSON.stringify(student),
      this._httpOptions).toPromise();
  }

  delete(id: string): Promise<Student> {
    return this._http.delete<Student>(this._baseurl + '/students/' + id, this._httpOptions).toPromise();
  }

  findById(id: string): Promise<Student> {
    return this._http.get<Student>(this._baseurl + '/students/' + id, this._httpOptions).toPromise();
  }

  enrollmentStudentInClassroom(id: string, subjectCode: string): Promise<Student> {
    const classRoomCode = {code: subjectCode};
    return this._http.post(this._baseurl + '/students/' + id + '/enrollment/', JSON.stringify(classRoomCode),
      this._httpOptions).toPromise();
  }
}
