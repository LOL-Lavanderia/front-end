import { Enderecos, Telefones, Role, Usuario } from "../../shared/models/usuario/usuario";


import { Component } from '@angular/core';
import { CadastroClienteService } from "../../shared/services/cadastro-clienteservice/cadastro-clienteservice";

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
    cidade: '',
    cep: 0,
    tipo: 0
  };

  constructor(private cadastroClienteService: CadastroClienteService) { }

  onSubmit() {
    // Preenche a estrutura de dados
    const enderecos: Enderecos = {
      id: 0,
      logradouro: this.endereco.logradouro,
      numero: this.endereco.numero,
      bairro: this.endereco.bairro,
      cidade: this.endereco.cidade,
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
}