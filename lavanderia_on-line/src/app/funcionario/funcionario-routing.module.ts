import { Routes } from "@angular/router";
import { RelatoriosComponent } from "./relatorios/relatorios.component";
import { authGuard } from "../auth/auth.guard";
import { RelatorioClientesComponent } from "./relatorio-clientes/relatorio-clientes.component";
import { RelatorioFieisComponent } from "./relatorio-fieis/relatorio-fieis.component";
import { RelatorioReceitasComponent } from "./relatorio-receitas/relatorio-receitas.component";
import { VisualizarPedidosComponent } from "./visualizar-pedidos/visualizar-pedidos.component";
import { ItemRoupaComponent } from "./item-roupa/item-roupa.component";
import { PaginaInicialComponent } from "../pages/pagina-inicial/pagina-inicial.component";
import { ManterFuncionarioComponent } from "./manter-funcionario/manter-funcionario.component";

export const funcionarioRoutes: Routes = [
  
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
            role: 'client, employee'
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
    path: 'relatorios',
    component: RelatoriosComponent,
    title: 'Relatórios',
    canActivate: [authGuard],
    data:{
        role: 'employee'
    },
    
    children: [

        {
            path: 'relatorio-clientes',
            component: RelatorioClientesComponent,
            title: 'Relatório de Clientes',
            canActivate: [authGuard],
            data:{
                role: 'employee'
            }
        },
        {
            path: 'relatorio-fieis',
            component: RelatorioFieisComponent,
            title: 'Relatório de Clientes Fiéis',
            canActivate: [authGuard],
            data:{
                role: 'employee'
            }
        },
        {
            path: 'relatorio-receitas',
            component: RelatorioReceitasComponent,
            title: 'Relatórios de Receitas',
            canActivate: [authGuard],
            data:{
                role: 'employee'
            }
        },
    ]
},
]