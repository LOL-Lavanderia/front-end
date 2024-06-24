import { Component } from '@angular/core';
import { Usuario } from '../../shared/models/usuario/usuario';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent {

usuario!: Usuario;


constructor() { }

// cadastra(){
//   this.usuario = new Usuario(
//     'exemplo@email.com',
//     'Nome do Cliente',
//     'senha123',
//     { role: 'client', cpf: '123.456.789-00', address: 'Rua do Cliente' }
  // )
// }
}
