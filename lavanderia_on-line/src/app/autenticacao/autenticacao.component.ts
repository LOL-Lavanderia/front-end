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
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
  autocad = false;
  usuario: Usuario = new Usuario(undefined, '', '', '', { role: 'client', cpf: '', enderecos: [], telefones: [] });
  email: string = '';
  password: string = '';
  loading: boolean = false;
  message: string = '';
  public passwordVisible: boolean = false;
  public isDisabled: boolean = false;  
  constructor(
    private toastr: ToastrService,
    private authService: AuthenticationService, 
    private router: Router, 
    public dialog: MatDialog
  ) {
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

  botaoAutoCadastro() {
    this.email = '';
    this.password = '';
    this.isDisabled = true;
    this.autocad = true;
  }

  handleClose(event: boolean) {
    this.autocad = event;
    this.isDisabled = false;
  }
}
