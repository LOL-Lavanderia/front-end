import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  getUserById(id: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUrl}${id}`);
  }

  updateUser(user: Usuario): Observable<any> {
    if (user.id)
      return this.http.put(`${this.apiUrl}${user.id}`, user);
    else
      return this.http.post(`${this.apiUrl}`, user);
  }
}
