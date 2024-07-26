import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';
import { ListagemPedidosComponent } from './cliente/listagem-pedidos/listagem-pedidos.component';
import { ItemRoupaComponent } from './funcionario/item-roupa/item-roupa.component';
import { ManterFuncionarioComponent } from './funcionario/manter-funcionario/manter-funcionario.component';
import { NovoPedidoComponent } from './cliente/novo-pedido/novo-pedido.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { ConsultaPedidosComponent } from './cliente/consulta-pedidos/consulta-pedidos.component';
import { RelatoriosComponent } from './funcionario/relatorios/relatorios.component';
import { RelatorioClientesComponent } from './funcionario/relatorio-clientes/relatorio-clientes.component';
import { RelatorioFieisComponent } from './funcionario/relatorio-fieis/relatorio-fieis.component';
import { RelatorioReceitasComponent } from './funcionario/relatorio-receitas/relatorio-receitas.component';
import { authGuard } from './auth/auth.guard';
import { VisualizarPedidosComponent } from './funcionario/visualizar-pedidos/visualizar-pedidos.component';

const routes: Routes = [
  { path: '', redirectTo: '/autenticacao', pathMatch: 'full' },
  { path: 'autenticacao', component: AutenticacaoComponent },
  { path: 'cadastro',  component: CadastroClienteComponent,},
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Pagina Inicial',
        canActivate: [authGuard],
        data:{
            role: 'client,employee'
        }
      },
     
      {
        path: 'listar-pedidos',
        component: ListagemPedidosComponent,
        title: 'Listagem de Pedidos Cliente',
        canActivate: [authGuard],
        data:{
            role: 'client'
        }
      },
      {
        path: 'visualizar-pedidos',
        component: VisualizarPedidosComponent,
        title: 'Visualizar Pedido',
        canActivate: [authGuard],
        data:{
            role: 'employee'
        }
      },
      {
        path: 'item-roupa',
        component: ItemRoupaComponent,
        title: 'Cadastro de Peça de Roupa',
        canActivate: [authGuard],
        data:{
            role: 'employee'
        }
      },
      {
      path: 'pagina-inicial',
      component: PaginaInicialComponent,
      title: 'Pagina Inicial',
      canActivate: [authGuard],
        data:{
            role: 'client,employee'
        }
      },
      {
        path: 'manter-funcionario',
        component: ManterFuncionarioComponent,
        title: 'Funcionários',
        canActivate: [authGuard],
        data:{
            role: 'employee'
        }
      },
      {
        path: 'novo-pedido',
        component: NovoPedidoComponent,
        title: 'Novo Pedido',
        canActivate: [authGuard],
        data:{
            role: 'client'
        }
      },
      {
        path: 'consulta-pedido',
        component: ConsultaPedidosComponent,
        title: 'Consulta Pedido',
        canActivate: [authGuard],
        data:{
            role: 'client'
        }
      },
      {
        path: 'relatorios',
        component: RelatoriosComponent,
        title: 'Relatórios',
        children:[

          {
            path: 'relatorio-clientes',
            component: RelatorioClientesComponent,
            title: 'Relatório de Clientes'
          },
          {
            path: 'relatorio-fieis',
            component: RelatorioFieisComponent,
            title: 'Relatório de Clientes Fiéis'
          },
          {
            path: 'relatorio-receitas',
            component: RelatorioReceitasComponent,
            title: 'Relatórios de Receitas'
          },
        ]
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
