import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/shared/guard';
import { ErrorPageComponent } from './content/error-page/error-page.component';


const routes: Routes = [{ path: 'login', loadChildren: () => import('./content/login/login.module').then(m => m.LoginModule) },
{ path: '', loadChildren: () => import('./content/content.module').then(m => m.ContentModule),
canActivate: [AuthGuard] },
{path: '404', component: ErrorPageComponent},
{path: '**', redirectTo: '/404'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
