import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';
import { ListagemPedidosComponent } from './cliente/listagem-pedidos/listagem-pedidos.component';
import { ItemRoupaComponent } from './funcionario/item-roupa/item-roupa.component';
import { PedidosAbertosComponent } from './funcionario/pedidos-abertos/pedidos-abertos/pedidos-abertos.component';
import { ManterFuncionarioComponent } from './funcionario/manter-funcionario/manter-funcionario.component';
import { NovoPedidoComponent } from './cliente/novo-pedido/novo-pedido.component';
import { ConsultaPedidosComponent } from './cliente/consulta-pedidos/consulta-pedidos.component';

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
      {
        path: 'listar-pedidos',
        component: ListagemPedidosComponent,
        title: 'Listagem de Pedidos Cliente'
      },
      {
        path: 'item-roupa',
        component: ItemRoupaComponent,
        title: 'Cadastro de Peça de Roupa'
      },
      {
      path: 'pagina-inicial-funcionario',
      component: PedidosAbertosComponent,
      title: 'Pedidos Abertos'
      },
      {
        path: 'manter-funcionario',
        component: ManterFuncionarioComponent,
        title: 'Cadastro de Funcionários'

      },
      {
        path: 'novo-pedido',
        component: NovoPedidoComponent,
        title: 'Novo Pedido'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
