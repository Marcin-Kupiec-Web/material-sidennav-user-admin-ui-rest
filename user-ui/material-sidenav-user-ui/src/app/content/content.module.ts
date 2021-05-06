import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';


@NgModule({
  declarations: [ContentComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
    UiModule
  ]
})
export class ContentModule { }
