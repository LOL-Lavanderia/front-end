import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly mockedUser = new Usuario('test@example.com', '12345');

  constructor() { }

  login(email: string, password: string): boolean {
    return email === this.mockedUser.email && password === this.mockedUser.password;
  }
}
