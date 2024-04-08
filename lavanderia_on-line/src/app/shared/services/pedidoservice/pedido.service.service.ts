import { Injectable } from '@angular/core';
import { Pedido } from '../../models/pedido/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { LocalStorageService } from '../../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService
) {
    this.listOrder = this.localStorageService.getOrders();

}




  listOrder: Order[] = [];


  createOrder(time: number, value: number) {
    return new Order(time, value)
  }

  addOrder(order: Order): void {
    this.listOrder.push(order);
    this.localStorageService.saveOrders(this.listOrder);
  }

  getPendingOrders(): Order[] {
    return this.listOrder.filter(order => order.status === 'Em Aberto');
  }

  hasPendingOrders(): boolean {
    return this.listOrder.some(order => order.status === 'Em Aberto');
  }

  getOrdersById(id: number): Order[] {
    return this.listOrder.filter(order => order.id.toString().includes(id.toString()));
  }


  updateOrder(order: Order): void {
    const index = this.listOrder.findIndex(o => o.id === order.id);
    if (index !== -1) {
      this.listOrder[index] = order;
      this.localStorageService.saveOrders(this.listOrder);
    }
  }










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
