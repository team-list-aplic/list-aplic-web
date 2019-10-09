import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from './services/student.service';
import { Student } from './models/student.model';
import { LoginService } from "./services/login.service";

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
  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    private modalService: NgbModal,
    private readonly _loginService: LoginService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  toogleCurrentView(view: View) {
    this.currentView = this.currentView == View.CREATE ? View.LIST : View.CREATE;
  }
  
  get isLoggedUser(): boolean {
    return !!this._loginService.readLoggedUser();
  }
}
