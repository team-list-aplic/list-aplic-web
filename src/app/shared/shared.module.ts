import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "./loading/loading.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { StudentFormComponent } from "./student-form/student-form.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SimpleNotificationsModule } from "angular2-notifications";
import { ModalModule } from "ngx-bootstrap";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ModalInfoComponent, SafeHtmlPipe } from './modal-info/modal-info.component';


@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent,
    StudentFormComponent,
    ModalInfoComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    LoadingComponent,
    NavbarComponent,
    StudentFormComponent,
    ModalInfoComponent,
    SafeHtmlPipe,
  ]
})
export class SharedModule { }
