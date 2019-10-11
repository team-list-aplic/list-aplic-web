import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list-aplic-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  title: string;
  id: string;

  constructor(private readonly _route: ActivatedRoute) {
    this.id = this._route.snapshot.paramMap.get('id');

    if (this.id === null) {
      this.title = "Criar Turma"
    }
    else {
      this.title = "Editar Turma"
    }
  }

  ngOnInit() {
  }
}