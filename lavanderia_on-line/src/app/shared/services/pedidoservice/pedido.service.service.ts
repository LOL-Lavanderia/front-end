import { Injectable } from '@angular/core';
import { Pedido } from '../../models/pedido/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}pedido`);
  }

  deletePedido(id: number): Observable<void> {
    console.log(`${this.apiUrl}pedido/${id}`);
    return this.http.delete<void>(`${this.apiUrl}pedido/${id}`);
  }

  register(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}pedido`, pedido);
  }

  getPedidobyId(id: number): Observable<Pedido>{
    return this.http.get<Pedido>(`${this.apiUrl}pedido/${id}`)
  }

  updatePedido(id: number, pedido: Pedido): Observable<any> {
    return this.http.put(`${this.apiUrl}pedido/${id}`, pedido);
  }

}
