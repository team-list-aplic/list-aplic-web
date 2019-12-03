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
import { ListClassroomComponent } from './classroom/list-classroom/list-classroom.component';
import { AppComponent } from './app.component';
import { StudentService } from './services/student.service';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuardService } from './services/auth-guard.service';
import { EnrollmentClassroomComponent } from './classroom/enrollment-classroom/enrollment-classroom.component';
import { ViewClassroomComponent } from './classroom/view-classroom/view-classroom.component';
import { SearchClassroomComponent } from './classroom/search-classroom/search-classroom.component';
import { DatePipe } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { DiscursiveQuestionComponent } from './question/discursive-question/discursive-question.component';
import { AssociateQuestionComponent } from './question/associate-question/associate-question.component';
import { MultipleChoicesQuestionComponent } from './question/multiple-choices-question/multiple-choices-question.component';
import { TrueFalseQuestionComponent } from './question/true-false-question/true-false-question.component';

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
  { path: 'search-classroom/:id', component: SearchClassroomComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MyProfileComponent,
    EditProfileComponent,
    ClassroomFormComponent,
    ClassroomComponent,
    ListClassroomComponent,
    EnrollmentClassroomComponent,
    ViewClassroomComponent,
    SearchClassroomComponent,
    QuestionComponent,
    DiscursiveQuestionComponent,
    AssociateQuestionComponent,
    MultipleChoicesQuestionComponent,
    TrueFalseQuestionComponent,
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
    LoginModule
  ],
  providers: [StudentService, ClassroomService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
