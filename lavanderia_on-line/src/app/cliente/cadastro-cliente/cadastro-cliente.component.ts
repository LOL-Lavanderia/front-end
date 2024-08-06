import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { CadastroClienteService } from "../../shared/services/cadastro-clienteservice/cadastro-clienteservice";
import { Enderecos, Telefones, Role, Usuario } from "../../shared/models/usuario/usuario";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent {
  public clienteForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cadastroClienteService: CadastroClienteService, private toastr: ToastrService,) {
    this.clienteForm = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, this.telefoneValidator]],
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, this.cepValidator]],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        localidade: ['', Validators.required],
        uf: ['',Validators.required]
      })
    });
  }

  get cpfInvalid() {
    const cpfControl = this.clienteForm.get('cpf');
    return cpfControl?.invalid && cpfControl.touched;
  }

  get nomeInvalid() {
    const nomeControl = this.clienteForm.get('nome');
    return nomeControl?.invalid && nomeControl.touched;
  }

  get emailInvalid() {
    const emailControl = this.clienteForm.get('email');
    return emailControl?.invalid && emailControl.touched;
  }

  get telefoneInvalid() {
    const telefoneControl = this.clienteForm.get('telefone');
    return telefoneControl?.invalid && telefoneControl.touched;
  }

  get cepInvalid() {
    const cepControl = this.clienteForm.get('endereco.cep');
    return cepControl?.invalid && cepControl.touched;
  }

  telefoneValidator(control: AbstractControl): ValidationErrors | null {
    const telefone = control.value?.replace(/\D/g, '');
    if (telefone && telefone.length === 11) {
      return null;
    }
    return { invalidTelefone: true };
  }

  cepValidator(control: AbstractControl): ValidationErrors | null {
    const cep = control.value?.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      return null;
    }
    return { invalidCep: true };
  }

  onSubmit() {
    const enderecos: Enderecos = {
      id: 0,
      logradouro: this.clienteForm.get('endereco.logradouro')?.value,
      numero: this.clienteForm.get('endereco.numero')?.value,
      bairro: this.clienteForm.get('endereco.bairro')?.value,
      localidade: this.clienteForm.get('endereco.localidade')?.value,
      cep: parseInt(this.clienteForm.get('endereco.cep')?.value.replace(/\D/g, ''), 10),
      uf: this.clienteForm.get('endereco.uf')?.value
    };

    const telefoneFormatado = this.clienteForm.get('telefone')?.value.replace(/\D/g, '');

    const telefones: Telefones = {
      id: 0,
      numero: parseInt(telefoneFormatado, 10)
    };

    const role: Role = {
      role: "client",
      cpf: this.clienteForm.get('cpf')?.value,
      enderecos: [enderecos],
      telefones: [telefones]
    };

    const newClient: Usuario = new Usuario(
      undefined,
      this.clienteForm.get('email')?.value,
      this.clienteForm.get('nome')?.value,
      '',
      role
    );

    console.log(newClient);
    this.cadastroClienteService.createClient(newClient).subscribe(
      response => {
        this.toastr.success('Cadastro realizado com sucesso! Senha encaminhada via e-mail.');
        this.clienteForm.reset();
      },
      error => {
        const errorMsg = error.error?.message || 'Erro ao cadastrar cliente';
        this.toastr.error(errorMsg);
      }
    );

  }

  getCep(cep: string): void {
    this.cadastroClienteService.getCep(cep.replace(/\D/g, '')).subscribe(
      data => {
        this.clienteForm.patchValue({
          endereco: {
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            cep: data.cep,
            uf:data.uf,
          }
        });
      },
      error => {
        console.error('Erro ao buscar detalhes do CEP', error);
      }
    );
  }
}