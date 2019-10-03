import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'list-aplic-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  @Input() student: Student;

  constructor(private readonly _studentService: StudentService) { }

  ngOnInit() {
  }

  editStudent() {
    this._studentService.update(this.student);
  }

}
