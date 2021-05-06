import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../material/material-module';
import { DialogStartComponent } from './role.component';

@NgModule({
  declarations: [RoleComponent, DialogStartComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
  ]
})
export class RoleModule { }
