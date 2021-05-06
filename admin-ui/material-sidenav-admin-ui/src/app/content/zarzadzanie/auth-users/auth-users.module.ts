import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthUsersRoutingModule } from './auth-users-routing.module';
import { AuthUsersComponent } from './auth-users.component';


@NgModule({
  declarations: [AuthUsersComponent],
  imports: [
    CommonModule,
    AuthUsersRoutingModule
  ]
})
export class AuthUsersModule { }
