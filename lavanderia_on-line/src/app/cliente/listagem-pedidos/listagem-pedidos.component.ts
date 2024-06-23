import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrls: ['./listagem-pedidos.component.css'],
})
export class ListagemPedidosComponent implements OnInit {
  listOrder: Order[] = [];
  isEmployee: boolean = true;
  selectedOrderStatus: string = '';

  constructor(public pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.pedidoService.listAll().pipe().subscribe((orders) => {
      this.listOrder = orders;

    }
    );
  }

  foundMatchStatus(orderStatus: string): boolean {
    if (!this.selectedOrderStatus) {
      return true;
    }
    return orderStatus === this.selectedOrderStatus;
  }

  noMatchesFound(): boolean {
    if (!this.selectedOrderStatus) {
      return false;
    }
    return this.listOrder.every((o) => o.status !== this.selectedOrderStatus);
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.listOrder = this.pedidoService.listAll.filter((order) =>
    //   order.id.toString().includes(filterValue)
    // );
  }

  confirmarRecolhimento(order: Order): void {
    order.status = 'Recolhido';
    this.pedidoService.createOrUpdatePedido( order, order.id).subscribe(() => {
      alert(`Pedido Recolhido!\nNúmero de Pedido: ${order.id}`);
    });
  }

  confirmarLavagem(order: Order): void {
    order.status = 'Aguardando pagamento';
    this.pedidoService.createOrUpdatePedido( order, order.id).subscribe(() => {
      alert(`Pedido Lavado!\nNúmero de Pedido: ${order.id}`);
    });
  }

  finalizarPedido(order: Order): void {
    order.status = 'Finalizado';
    this.pedidoService.createOrUpdatePedido( order, order.id).subscribe(() => {
      alert(`Pedido Finalizado!\nNúmero de Pedido: ${order.id}`);
    });
  }

  pagarPedido(order: Order): void {
    order.status = 'Pago';
    this.pedidoService.createOrUpdatePedido( order, order.id).subscribe(() => {
      alert(`Pedido Pago!\nNúmero de Pedido: ${order.id}`);
    });
  }

  cancelarPedido(order: Order): void {
    order.status = 'Cancelado';
    this.pedidoService.createOrUpdatePedido( order, order.id).subscribe(() => {
      alert(`Pedido Cancelado!\nNúmero de Pedido: ${order.id}`);
    });
  }
}
