import {Component, OnInit, TemplateRef} from '@angular/core';
import {StudentService} from "../services/student.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'list-aplic-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private readonly _studentService: StudentService,
              private readonly _modalService: BsModalService,
  ) { }

  ngOnInit() {
  }

  deleteProfile(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  confirm() {
    //this._studentService.delete('1');
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }
}
