import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'list-aplic-list-classroom',
  templateUrl: './list-classroom.component.html',
  styleUrls: ['./list-classroom.component.scss']
})
export class ListClassroomComponent implements OnInit {

  constructor(private readonly _router: Router) { }

  ngOnInit() {
  }

  editClassroom(id){
    this._router.navigate(['/edit-classroom', { id: id}]);
  }
}
