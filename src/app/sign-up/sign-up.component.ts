import {Component, OnInit} from '@angular/core';
import {Student} from "../models/student.model";
import {StudentService} from "../services/student.service";
import {NotificationsService} from "angular2-notifications";
import {LoadingService} from "../services/loading.service";
import {Form, NgForm} from "@angular/forms";

@Component({
  selector: 'list-aplic-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
