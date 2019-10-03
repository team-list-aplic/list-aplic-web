import { Component } from '@angular/core';
import { StudentService } from './services/student.service';
import { Student } from './models/student.model';

enum View {
  CREATE,
  LIST,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentView = View.CREATE;

  constructor() {}

  toogleCurrentView(view: View) {
    this.currentView = this.currentView == View.CREATE ? View.LIST : View.CREATE;
  }
}
