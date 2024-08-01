import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authenticationservice/authentication.service';
import { Usuario } from '../shared/models/usuario/usuario';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, NgForm } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CadastroClienteComponent } from '../cliente/cadastro-cliente/cadastro-cliente.component';
import { ToastrService } from 'ngx-toastr';

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
export class AutenticacaoComponent implements OnInit {
  usuario: Usuario = new Usuario(undefined, '', '', '', { role: 'client', cpf: '', enderecos: [], telefones: [] });
  email: string = '';
  password: string = '';
  loading: boolean = false;
  message: string = '';
  public passwordVisible: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthenticationService, 
    private router: Router, 
    public dialog: MatDialog
  ) {
    //toastr top and center
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
  }

  ngOnInit(): void {
    if (this.authService.usuarioLogado) {
      this.router.navigate(['/']);
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onLogin(formLogin: NgForm): void {
    this.message = '';
    this.loading = true;

    if (formLogin.valid) {
      this.authService.login(this.email, this.password).subscribe(
        usu => {
          if (usu != null) {
            this.authService.usuarioLogado = usu;
            this.loading = false;
            this.router.navigate(['/']);
          } else {
            this.message = 'Usuário/Senha inválidos.';
            this.loading = false;
          }
        },
        error => {
          console.error('Login failed:', error);
          this.toastr.error('Usuário/Senha inválidos.', 'Erro');
          this.message = 'Usuário/Senha inválidos.';
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CadastroClienteComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
