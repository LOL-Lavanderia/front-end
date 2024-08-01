import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component'
import { MainComponent } from './main/main.component';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';
import { clienteRoutes } from './cliente/cliente-routing.module';
import { funcionarioRoutes } from './funcionario/funcionario-routing.module';


const routes: Routes = [
  { path: '', redirectTo: '/autenticacao', pathMatch: 'full' },
  { path: 'autenticacao', component: AutenticacaoComponent },
  { path: 'cadastro',  component: CadastroClienteComponent,},
  {
    path: '',
    component: MainComponent,
    children: [
      ...clienteRoutes,
      ...funcionarioRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
