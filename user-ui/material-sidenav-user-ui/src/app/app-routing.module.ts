import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [{ path: '', loadChildren: () => import('./content/content.module').then(m => m.ContentModule),
canActivate: [AuthGuard]
},
{path: '404', component: ErrorPageComponent},
{path: '**', redirectTo: '/404'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
