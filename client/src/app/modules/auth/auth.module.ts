import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginPage} from './pages/login/login.page';
import {RegisterPage} from './pages/register/register.page';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';


@NgModule({
  declarations: [LoginPage, RegisterPage, AuthLayoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgxsModule.forFeature()
  ]
})
export class AuthModule {
}
