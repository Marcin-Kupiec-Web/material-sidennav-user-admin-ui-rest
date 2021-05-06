import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollnimationComponent } from '../scroll-animation/scroll-animation.component';
import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';


@NgModule({
  declarations: [StartComponent, ScrollnimationComponent],
  imports: [
    CommonModule,
    StartRoutingModule
  ]
})
export class StartModule { }
