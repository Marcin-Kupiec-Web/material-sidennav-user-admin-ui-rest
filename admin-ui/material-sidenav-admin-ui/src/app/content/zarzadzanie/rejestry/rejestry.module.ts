import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RejestryRoutingModule } from './rejestry-routing.module';
import { RejestryComponent } from './rejestry.component';
import {MaterialModule} from '../../../material/material-module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [RejestryComponent],
  imports: [
    CommonModule,
    RejestryRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
  ]
})
export class RejestryModule { }
