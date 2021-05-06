import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';

const routes: Routes = [{ path: '', component: ContentComponent,
children: [
  { path: 'start', loadChildren: () => import('./start/start.module').then(m => m.StartModule) },
  {
    path: 'users',
  loadChildren: () => import('./zarzadzanie/auth-users/users/users.module').then(m => m.UsersModule)
}
,
{
  path: 'privileges',
loadChildren: () => import('./zarzadzanie/auth-users/privileges/privileges.module').then(m => m.PrivilegesModule)
}
,
{
  path: 'role',
loadChildren: () => import('./zarzadzanie/auth-users/role/role.module').then(m => m.RoleModule)
}
,
{
  path: 'grupy',
loadChildren: () => import('./zarzadzanie/grupy/grupy.module').then(m => m.ZakladyModule)
},
{ path: 'rejestry',
loadChildren: () => import('./zarzadzanie/rejestry/rejestry.module').then(m => m.RejestryModule) }
] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
