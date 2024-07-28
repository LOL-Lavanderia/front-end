import { Enderecos, Telefones, Role, Usuario } from "../../shared/models/usuario/usuario";


import { Component } from '@angular/core';
import { CadastroClienteService } from "../../shared/services/cadastro-clienteservice/cadastro-clienteservice";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent {
  nome: string = '';
  email: string = '';
  cpf: string = '';
  numero: string = '';
  endereco: Enderecos = {
    id: 0,
    logradouro: '',
    numero: '',
    bairro: '',
    localidade: '',
    cep: 0,
    tipo: 0
  };
  public clienteForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private cadastroClienteService: CadastroClienteService) {
    this.clienteForm = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]], // Exemplo de padrão para CEP
      numero: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }
  
  get cpfInvalid() {
    const cpfControl = this.clienteForm.get('cpf');
    return cpfControl?.invalid && cpfControl.touched;
  }
  
  get emailInvalid() {
    const emailControl = this.clienteForm.get('email');
    return emailControl?.invalid && emailControl.touched;
  }
  
  get cepInvalid() {
    const cepControl = this.clienteForm.get('cep');
    return cepControl?.invalid && cepControl.touched;
  }
  
  get numeroInvalid() {
    const numeroControl = this.clienteForm.get('numero');
    return numeroControl?.invalid && numeroControl.touched;
  }

  onSubmit() {
    // Preenche a estrutura de dados
    const enderecos: Enderecos = {
      id: 0,
      logradouro: this.endereco.logradouro,
      numero: this.endereco.numero,
      bairro: this.endereco.bairro,
      localidade: this.endereco.localidade,
      cep: parseInt(this.endereco.cep.toString(), 10),
      tipo: this.endereco.tipo
    };

    const telefones: Telefones = {
      id: 0,
      numero: parseInt(this.numero, 10)
    };

    const role: Role = {
      role: "client",
      cpf: this.cpf,
      enderecos: [enderecos],
      telefones: [telefones]
    };

    const newClient: Usuario = new Usuario(
      undefined,
      this.email,
      this.nome,
      '', // Senha deve ser configurada conforme necessário
      role
      
    );
    console.log(newClient);
    // Envia o cliente para o serviço
    this.cadastroClienteService.createClient(newClient).subscribe(response => {
      console.log('Cliente cadastrado com sucesso!', response);
      // Adicione lógica adicional conforme necessário
    }, error => {
      console.error('Erro ao cadastrar cliente', error);
    });
  }

  getCep(cep: number | string): void {
    this.cadastroClienteService.getCep(cep).subscribe(
      data => {
        // Atualiza o estado do componente com os dados recebidos
        this.endereco = {
          ...this.endereco,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          cep: data.cep,
        };
      },
      error => {
        console.error('Erro ao buscar detalhes do CEP', error);
      }
    );
  }

}