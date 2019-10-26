import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ClassroomFormComponent } from './shared/classroom-form/classroom-form.component';
import { ClassroomService } from './services/classroom.service';
import { ClassroomComponent } from './classroom/classroom.component';
import { DeleteClassroomComponent } from './delete-classroom/delete-classroom.component';
import { ListClassroomComponent } from './list-classroom/list-classroom.component';
import { AppComponent } from './app.component';
import { StudentService } from './services/student.service';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from 'ngx-bootstrap';
import { LoginModule } from "./login/login.module";
import { SharedModule } from "./shared/shared.module";
import { AuthGuardService } from "./services/auth-guard.service";
import { EnrollmentClassroomComponent } from './enrollment-classroom/enrollment-classroom.component';
import { ViewClassroomComponent } from './view-classroom/view-classroom.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuardService] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardService] },
  { path: 'list-classroom', component: ListClassroomComponent },
  { path: 'add-classroom', component: ClassroomComponent },
  { path: 'edit-classroom/:id', component: ClassroomComponent },
  { path: 'enrollment-classroom', component: EnrollmentClassroomComponent },
  { path: 'view-classroom/:id', component: ViewClassroomComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MyProfileComponent,
    EditProfileComponent,
    ClassroomFormComponent,
    ClassroomComponent,
    DeleteClassroomComponent,
    ListClassroomComponent,
    EnrollmentClassroomComponent,
    ViewClassroomComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
  ],
  providers: [StudentService, ClassroomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
