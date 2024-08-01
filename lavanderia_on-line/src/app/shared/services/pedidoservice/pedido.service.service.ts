import { Injectable } from '@angular/core';
import { Order } from '../../models/order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/api/pedidos';
  //private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient,

) {


}


  listOrder: Order[] = [];


  createOrder(time: number, value: number) {
    return new Order(time, value)
  }

  addOrder(order: Order): void {
    //enviar o json para o json server usando metodo post
    this.listOrder.push(order);

  }

  getPendingOrders(): Order[] {
    return this.listOrder.filter(order => order.status === 'Em Aberto');
  }

  hasPendingOrders(): boolean {
    return this.listOrder.some(order => order.status === 'Em Aberto');
  }

  getOrdersById(clienteId: String| null, pedidoId: String): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/by-cliente/${clienteId}/pedido/${pedidoId}`);
}


  updateOrder(order: Order): void {
    const index = this.listOrder.findIndex(o => o.id === order.id);
    if (index !== -1) {
      this.listOrder[index] = order;

    }
  }







  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }



  

  listAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }
  listOpenOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?status=Em Aberto`);
  }
  getOrdersByClientId(clientId: string | null): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiUrl}/by-cliente/${clientId}`);
  }
  deletePedido(id: number): Observable<void> {
    console.log(`${this.apiUrl}pedido/${id}`);
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  createOrUpdatePedido(order: Order, id: string | undefined): Observable<Order> {
    if (id) {
      console.log("enviando pra = ", `${this.apiUrl}/${order.id}`);
      order.closeDate = new Date();
      return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
    } else {
      return this.http.post<Order>(`${this.apiUrl}`, order);
    }
  }

  getPedidobyId(clientId: string, id: number): Observable<Order>{
    return this.http.get<Order>(`${this.apiUrl}pedido/${id}`)
  }



}
