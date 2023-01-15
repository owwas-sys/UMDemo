import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { LoginComponent } from './auth/components/login/login.component';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { FormElementsComponent } from './roles/components/add-role/form-elements.component';
import { RolesComponent } from './roles/roles.component';
import { UserGroupsComponent } from './user-management/user-groups/user-groups.component';
import { UsersComponent } from './user-management/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'custom-layout',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'user-groups',
        component: UserGroupsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'add-role',
        loadChildren: () => import('./roles/components/add-role/form-elements.module').then(m => m.FormElementsModule),
            data: {
              containerEnabled: true
            }
      },
      {
        path: 'add-user-groups',
        loadChildren: () => import('./user-management/add-user-groups/add-user-groups.module').then(m => m.AddUserGroupsModule),
            data: {
              containerEnabled: true
            }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {
}
