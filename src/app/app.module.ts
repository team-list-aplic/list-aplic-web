import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { StudentService } from './services/student.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoadingComponent } from './shared/loading/loading.component';
import { StudentFormComponent } from './shared/student-form/student-form.component';
import { ModalModule } from 'ngx-bootstrap';
import { ClassroomFormComponent } from './shared/classroom-form/classroom-form.component';
import { ClassroomService } from './services/classroom.service';
import { ClassroomComponent } from './classroom/classroom.component';
import { DeleteClassroomComponent } from './delete-classroom/delete-classroom.component';
import { ListClassroomComponent } from './list-classroom/list-classroom.component';
import { ParticipateClassroomComponent } from './participate-classroom/participate-classroom.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'list-classroom', component: ListClassroomComponent },
  { path: 'classroom', component: ClassroomComponent },
  { path: 'participate-classroom', component: ParticipateClassroomComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MyProfileComponent,
    SignUpComponent,
    EditProfileComponent,
    LoadingComponent,
    StudentFormComponent,
    ClassroomFormComponent,
    ClassroomComponent,
    DeleteClassroomComponent,
    ListClassroomComponent,
    ParticipateClassroomComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  entryComponents: [
    ParticipateClassroomComponent
  ],
  providers: [StudentService, ClassroomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
