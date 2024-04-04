import { Injectable } from '@angular/core';
import { Funcionario } from '../../models/funcionario/funcionario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:8080/funcionario/';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}`);
  }

  deleteFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  register(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.apiUrl}`, funcionario);
  }

  getFuncionarioById(id: number): Observable<Funcionario>{
    return this.http.get<Funcionario>(`${this.apiUrl}${id}`);
  }

  updateFuncionario(id: number, funcionario: Funcionario): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, funcionario);
  }
}
