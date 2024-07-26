import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// export type Client = { role: "client", cpf: string, address: Address[], phone: Phone[] };
export class AuthenticationService {
  private readonly apiUrl = 'http://localhost:8080/api/usuarios';
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;
  

  constructor(private http: HttpClient, private router: Router) {
    const localUser = this.isLocalStorageAvailable() ? JSON.parse(localStorage.getItem('currentUser')!) : null;
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(localUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(user => {
        if (user) {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/pagina-inicial']);
    }
    this.currentUserSubject.next(null);
    

  }

  getUsuarioLogado(): Usuario | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): string | null {
    const currentUser = this.getUsuarioLogado();
    return currentUser && currentUser.id !== undefined ? currentUser.id : null;
  }

  getRole(): string | null{
    const currentUser = this.getUsuarioLogado();
    return currentUser && currentUser.role.role !== undefined ? currentUser.role.role : null;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

}


