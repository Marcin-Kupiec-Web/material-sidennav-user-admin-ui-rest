import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthUsersComponent } from './auth-users.component';

const routes: Routes = [{ path: '', component: AuthUsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthUsersRoutingModule { }
