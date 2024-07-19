import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
// export type Client = { role: "client", cpf: string, address: Address[], phone: Phone[] };
export class AuthenticationService {

  private readonly mockedUser = new Usuario(undefined, 'test@example.com', 'mateus', '123456', { role: 'client', cpf: '', enderecos: [], telefones: [] });

  constructor() { }

  login(email: string, password: string): boolean {
    return email === this.mockedUser.email && password === this.mockedUser.senha;
  }
}
