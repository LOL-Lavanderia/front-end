import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: '/autenticacao', pathMatch: 'full' },
  { path: 'autenticacao', component: AutenticacaoComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Pagina Inicial'
      },
      {
        path: 'cadastro',
        component: CadastroClienteComponent,
        title: 'Cadastro de Cliente'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
