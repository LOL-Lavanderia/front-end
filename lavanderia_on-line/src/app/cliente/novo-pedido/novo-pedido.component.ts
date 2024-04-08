import { Component } from '@angular/core';
import { Roupa } from '../../shared/models/roupa';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.css']
})
export class NovoPedidoComponent {
  listaDeRoupas: Roupa[] = [
    { name: 'Camisa', price: 20, quantity: 0, time: 30 },
    { name: 'Calça', price: 20, quantity: 0, time: 40 },
    { name: 'Calça Jeans', price: 25, quantity: 0, time: 50 },
    { name: 'Jaqueta', price: 40, quantity: 0, time: 60 },
    { name: 'Meia', price: 5, quantity: 0, time: 15 },
    { name: 'Cueca', price: 5, quantity: 0, time: 20 },
    { name: 'Bermuda', price: 15, quantity: 0, time: 35 }
  ];

  showOrcamento: boolean = false;
  value: number = 0;
  time: number = 0;
  newOrder: Order = new Order(0, 0);
  order: any;

  constructor(private pedidoService: PedidoService) { }
  private orderNumberCounter: number = 1;

  calculateValue(): void {
    this.value = this.listaDeRoupas.reduce((sum, item) => sum + ((item.quantity ?? 0) * (item.price ?? 0)), 0);
  }

  calculateTime(): void {
    if (this.listaDeRoupas.length > 0) {
      let short = this.listaDeRoupas[0].time ?? 0;
      for (const element of this.listaDeRoupas) {
        if (element.time !== undefined && element.quantity! > 0) {
          short = Math.min(element.time, short);
        }
      }
      this.time = short;
    }
  }

  isOrderValid(): boolean {
    return this.listaDeRoupas.some(item => item.quantity !== undefined && item.quantity > 0);
  }

  generateOrder(): void {
    this.calculateTime();
    this.calculateValue();

    this.newOrder = new Order(this.orderNumberCounter, this.value);
    this.orderNumberCounter++;

    this.newOrder.time = this.time;
    this.newOrder.openDate = new Date();
    this.insertClothes(this.newOrder);
    this.showOrcamento = true;
  }

  insertClothes(order: Order): void {
    console.log(order);
    for (const roupas of this.listaDeRoupas) {
      if (roupas.quantity! > 0) {
        let copyRoupas = { ...roupas };
        order.addRoupas(copyRoupas);
      }
    }
    console.log(order);
  }

  sendOrder(): void {
    this.showOrcamento = false;
    this.pedidoService.addOrder(this.newOrder);
    alert(`Orçamento Aprovado!\nNúmero de Pedido: ${this.newOrder.id}`);

    this.listaDeRoupas.forEach(item => item.quantity = 0);
    this.value = 0;
    this.time = 0;
    this.showOrcamento = false;
  }

  declineOrder(): void {
    this.showOrcamento = false;
    this.newOrder.status = 'Rejeitado';
    this.pedidoService.addOrder(this.newOrder);
    alert(`Orçamento Rejeitado!\nNúmero de Pedido: ${this.newOrder.id}`);
    this.listaDeRoupas.forEach(item => item.quantity = 0);
    this.value = 0;
    this.time = 0;
    this.showOrcamento = false;
  }
}
