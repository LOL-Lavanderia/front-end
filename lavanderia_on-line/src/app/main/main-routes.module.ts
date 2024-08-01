import { Routes } from "@angular/router";
import { funcionarioRoutes } from "../funcionario/funcionario-routing.module";
import { clienteRoutes } from "../cliente/cliente-routing.module";
import { authGuard } from "../auth/auth.guard";
import { MainComponent } from "./main.component";
import { RedirectComponent } from "./redirect-component";

export const MainRoute: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [authGuard],
        data: { expectedRole: ['client', 'employee'] },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: RedirectComponent
            },
            ...funcionarioRoutes,
            ...clienteRoutes,
            
        ]
    }
];
