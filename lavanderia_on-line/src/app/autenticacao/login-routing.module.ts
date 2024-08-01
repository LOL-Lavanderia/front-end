import { Routes } from "@angular/router";
import { AutenticacaoComponent } from "./autenticacao.component";

export const LoginRoutes: Routes = [
    {
        path: 'autenticacao',
        component: AutenticacaoComponent,
        pathMatch: 'full'
      },
]