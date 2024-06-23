import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authenticationservice/authentication.service';
import { Usuario } from '../shared/models/usuario/usuario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao',
  standalone: true,
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.css',
  imports: [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  FormsModule]
})


export class AutenticacaoComponent {
  usuario: Usuario = new Usuario(undefined, '', '', '', { role: 'client', cpf: '', address: [], phone: [] });

  constructor(private authService: AuthenticationService,
    private router: Router) {}

  onLogin(): void {
    const isAuthenticated = this.authService.login(this.usuario.email, this.usuario.password);
    if (isAuthenticated) {
      this.router.navigate(['/dashboard']);
      console.log('Login successful!');
    } else {
      console.error('Login failed');
    }
  }


}
