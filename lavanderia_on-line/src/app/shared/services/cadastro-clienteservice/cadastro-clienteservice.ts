import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class CadastroClienteService {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  createClient(client: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, client);
  }

}