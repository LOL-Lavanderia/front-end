import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roupa } from '../models/roupa';

@Injectable({
  providedIn: 'root'
})
export class RoupaService {

  private apiUrl = 'http://localhost:8080/api/roupas';

  constructor(private http: HttpClient) { }

  listarRoupas(): Observable<Roupa[]> {
    return this.http.get<Roupa[]>(this.apiUrl);
  }

  removerRoupa(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  inserirRoupa(roupa: Roupa): Observable<Roupa> {
    return this.http.post<Roupa>(this.apiUrl, roupa);
  }

  buscarPorId(id: number): Observable<Roupa | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Roupa>(url);
  }

  alterar(roupa: Roupa): Observable<Roupa | null> {
    const url = `${this.apiUrl}/${roupa.id}`;
    return this.http.put<Roupa>(url, roupa);
  }
  
}
