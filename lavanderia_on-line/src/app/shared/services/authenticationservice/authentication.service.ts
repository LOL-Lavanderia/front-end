import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly apiUrl = 'http://localhost:8080/api/usuarios';
  
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<Usuario | null> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as const
    };

    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, password }, httpOptions)
      .pipe(
        map( (resp:HttpResponse<Usuario>)  => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError(err => {
          if (err.status === 401) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  public get usuarioLogado(): Usuario {
    let usu = localStorage.getItem(LS_CHAVE);
    return usu ? JSON.parse(usu) : null;
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage.setItem(LS_CHAVE, JSON.stringify(usuario));
  }

  logout() {
    localStorage.removeItem(LS_CHAVE);
  }

  getCurrentUserId(): string | null {
    return this.usuarioLogado && this.usuarioLogado.id !== undefined ? this.usuarioLogado.id : null;
  }

  getRole(): string | null {
    return this.usuarioLogado && this.usuarioLogado.role.role !== undefined ? this.usuarioLogado.role.role : null;
  }
}