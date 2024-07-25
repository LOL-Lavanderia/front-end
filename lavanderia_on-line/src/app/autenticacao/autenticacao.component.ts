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
  usuario: Usuario = new Usuario(undefined, '', '', '', { role: 'client', cpf: '', enderecos: [], telefones: [] });

  email: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService,
    private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful:', response);
        this.router.navigate(['/pagina-inicial']); // Redirecionar para a página principal ou de perfil
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  autoCadastro() {
    this.router.navigate(['/cadastro']);
  }

}
