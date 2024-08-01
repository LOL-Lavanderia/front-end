import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enderecos, Usuario } from '../../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class CadastroClienteService {

  private apiUrl = 'http://localhost:8080/api/usuarios';
  private cepUrl = 'http://localhost:8080/api/endereco/cep';

  constructor(private http: HttpClient) { }

  createClient(client: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, client);
  }

  getCep(cep: number | string):Observable<Enderecos>{
    console.log(this.http.get<Enderecos>(`${this.cepUrl}/${cep}`));
    return this.http.get<Enderecos>(`${this.cepUrl}/${cep}`)
  }
}