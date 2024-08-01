import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutes } from './autenticacao/login-routing.module';
import { MainRoute } from './main/main-routes.module';


const routes: Routes = [
  ...MainRoute,
  ...LoginRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
