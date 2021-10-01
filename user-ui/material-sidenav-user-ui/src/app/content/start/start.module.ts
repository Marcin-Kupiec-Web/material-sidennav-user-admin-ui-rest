import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollnimationComponent } from '../scroll-animation/scroll-animation.component';
import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [StartComponent, ScrollnimationComponent],
  imports: [
    CommonModule,
    StartRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class StartModule { }
