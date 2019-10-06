import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {StudentService} from './services/student.service';
import {LoginComponent} from './login/login.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoadingComponent} from './shared/loading/loading.component';
import {StudentFormComponent} from './shared/student-form/student-form.component';
import {ModalModule} from 'ngx-bootstrap';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: '',
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
    StudentFormComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
