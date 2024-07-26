import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authenticationservice/authentication.service';
import { Usuario } from '../shared/models/usuario/usuario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-autenticacao',
  standalone: true,
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css'],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    CommonModule
  ]
})
export class AutenticacaoComponent {
  usuario: Usuario = new Usuario(undefined, '', '', '', { role: 'client', cpf: '', enderecos: [], telefones: [] });
  email: string = '';
  password: string = '';
  loading: boolean = false;
  message: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  onLogin(formLogin: NgForm): void {
    this.message = '';
    this.loading = true;

    if (formLogin.valid) {
      this.authService.login(this.email, this.password).subscribe(
        usu => {
          if (usu != null) {
            this.authService.usuarioLogado = usu;
            this.loading = false;
            this.router.navigate(['/pagina-inicial']);
          } else {
            this.message = 'Usuário/Senha inválidos.';
            this.loading = false;
          }
        },
        error => {
          console.error('Login failed:', error);
          this.message = 'Erro ao tentar logar. Tente novamente mais tarde.';
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
      this.message = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  autoCadastro(event: Event) {
    event.preventDefault();
    this.router.navigate(['/cadastro']);
  }
}
