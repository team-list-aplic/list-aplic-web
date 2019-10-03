import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'list-aplic-list-Student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  students: Student[] = [];
  student?: Student;

  constructor(private readonly _studentService: StudentService) { }

  ngOnInit() {
    this._getAllStudents();
  }

  private async _getAllStudents() {
    this.students = await this._studentService.findAll();
  }

  async getStudent(student: Student) {
    const id = student.id;
    this.student = await this._studentService.findById(id);
  }

  removeStudent(student: Student) {
    const id = student.id;
    this._studentService.delete(id);
    this.students = this.students.filter(student => {
      return student.id !== id;
    })
  }

}
