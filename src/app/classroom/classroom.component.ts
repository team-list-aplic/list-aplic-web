import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list-aplic-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  actionCreate: boolean;
  title: string;

  constructor(private readonly _route: ActivatedRoute) {
    let id = this._route.snapshot.paramMap.get('id');

    if (id === null) {
      this.actionCreate = true;
      this.title = "Criar Turma"
    }
    else {
      this.actionCreate = false;
      this.title = "Editar Turma"
    }
  }

  ngOnInit() {
  }

}
