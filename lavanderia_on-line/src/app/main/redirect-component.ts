// src/app/redirect/redirect.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authenticationservice/authentication.service';

@Component({
  selector: 'app-redirect',
  template: ''
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const role = this.authService.usuarioLogado?.role.role;

    if (role === 'client') {
      this.router.navigate(['/inicial-cliente']);
    } else if (role === 'employee') {
      this.router.navigate(['/inicial-funcionario']);
    }  else {
      this.router.navigate(['/autenticacao']);
    }
  }
}
