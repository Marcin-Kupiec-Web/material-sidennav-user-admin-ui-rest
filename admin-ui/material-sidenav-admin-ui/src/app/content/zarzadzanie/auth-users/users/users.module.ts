import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../material/material-module';
import { DialogUsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent, DialogUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
  ]
})
export class UsersModule { }
