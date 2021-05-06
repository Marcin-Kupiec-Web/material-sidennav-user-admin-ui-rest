import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';

const routes: Routes = [{ path: '', component: ContentComponent,
children: [
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then(m => m.StartModule)
  },
  {
    path: '',
    loadChildren: () => import('./start/start.module').then(m => m.StartModule)
  },
  { path: 'kontakt', loadChildren: () => import('./kontakt/kontakt.module').then(m => m.KontaktModule) },
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
