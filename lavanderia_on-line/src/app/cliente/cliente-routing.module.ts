import { Routes } from "@angular/router";
import { NovoPedidoComponent } from "./novo-pedido/novo-pedido.component";
import { authGuard } from "../auth/auth.guard";
import { ConsultaPedidosComponent } from "./consulta-pedidos/consulta-pedidos.component";
import { ListagemPedidosComponent } from "./listagem-pedidos/listagem-pedidos.component";
import { PaginaInicialComponent } from "../pages/pagina-inicial/pagina-inicial.component";

export const clienteRoutes: Routes = [
    {
        path: '',
        redirectTo: '/inicial-cliente',
        pathMatch: 'full'
    },
    {
        path: 'inicial-cliente',
        component: PaginaInicialComponent,
        title: 'Pagina Inicial',
        canActivate: [authGuard],
        data: {
            role: 'client'
        }
    },
    {
        path: 'listar-pedidos',
        component: ListagemPedidosComponent,
        title: 'Listagem de Pedidos Cliente',
        canActivate: [authGuard],
        data: {
            role: 'client'
        }
    },
    {
        path: 'novo-pedido',
        component: NovoPedidoComponent,
        title: 'Novo Pedido',
        canActivate: [authGuard],
        data: {
            role: 'client'
        }
    },
    {
        path: 'consulta-pedido',
        component: ConsultaPedidosComponent,
        title: 'Consulta Pedido',
        canActivate: [authGuard],
        data: {
            role: 'client'
        }
    },


]