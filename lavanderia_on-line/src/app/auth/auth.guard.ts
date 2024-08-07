import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../shared/services/authenticationservice/authentication.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthenticationService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);
  const usuarioLogado = loginService.usuarioLogado;
  let url = state.url;
  if (usuarioLogado) {
    if (route.data?.['role'] && route.data?.['role'].indexOf(usuarioLogado.role.role) === -1) {
      toastrService.error("Você não tem permissão para acessar " + url, "Acesso Negado");
      router.navigate(['/pagina-inicial'], { queryParams: { error: "Você não tem permissão para acessar " + url } });
      return false;
    }
      return true;
  } else {
    // Redireciona para a página de autenticação se não estiver logado
    router.navigate(['/autenticacao'], { queryParams: { returnUrl: url } });
    return false;
  }
};
