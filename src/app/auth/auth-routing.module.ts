import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { LoginComponent } from './components/login/login.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class AuthRoutingModule {
}
