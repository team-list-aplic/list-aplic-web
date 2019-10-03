import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'list-aplic-create-Student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();

  constructor(private readonly _studentService: StudentService) { }

  ngOnInit() {
  }

  async createStudent() {
    const student = await this._studentService.save(this.student);
  }

}
