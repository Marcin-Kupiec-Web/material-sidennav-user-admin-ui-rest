import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupyRoutingModule } from './grupy-routing.module';
import { GrupyComponent } from './grupy.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material-module';
import { DialogGroupComponent } from './grupy.component';
@NgModule({
  declarations: [GrupyComponent, DialogGroupComponent],
  imports: [
    CommonModule,
    GrupyRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule
  ]
})
export class ZakladyModule { }
















/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZakladyRoutingModule } from './zaklady-routing.module';
import { ZakladyComponent } from './zaklady.component';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {InputTextModule} from 'primeng/inputtext';
import { FlexLayoutModule } from '@angular/flex-layout';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [ZakladyComponent],
  imports: [
    CommonModule,
    ZakladyRoutingModule,
    ToastModule,
    DialogModule,
    TableModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    InputTextModule,
    FlexLayoutModule,
    InputTextareaModule
  ]
})
export class ZakladyModule { }
*/
