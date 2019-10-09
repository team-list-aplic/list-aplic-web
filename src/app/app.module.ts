import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {StudentService} from './services/student.service';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ModalModule} from 'ngx-bootstrap';
import {LoginModule} from "./login/login.module";
import {SharedModule} from "./shared/shared.module";
import {AuthGuardService} from "./services/auth-guard.service";

const appRoutes: Routes = [
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuardService] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardService] },
  { path: '',
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
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    LoginModule,
    SharedModule,
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
