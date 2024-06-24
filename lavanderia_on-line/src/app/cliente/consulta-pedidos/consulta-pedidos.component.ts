import { Component } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';

@Component({
  selector: 'app-consulta-pedido',
  templateUrl: './consulta-pedidos.component.html',
  styleUrls: ['./consulta-pedidos.component.scss']
})
export class ConsultaPedidosComponent {
  pedidoNumero: number | undefined;
  pedidos: Order[] = [];

  constructor(private orderService: PedidoService) { }
  cancelarPedido(order: Order): void {
    order.status = 'Cancelado';
    this.orderService.createOrUpdatePedido(order, order.id).subscribe(() => {
      alert(`Pedido Cancelado!\nNúmero de Pedido: ${order.id}`);
    });
  }
  pagarPedido(order: Order): void {
    order.status = 'Pago';
    this.orderService.createOrUpdatePedido(order, order.id).subscribe(() => {
      alert(`Pedido Pago!\nNúmero de Pedido: ${order.id}`);
    });
  }
  consultarPedido() {
    if (this.pedidoNumero) {
      this.orderService.getOrdersById(this.pedidoNumero.toString()).subscribe((pedido) => {
        if (pedido) {
          this.pedidos = [pedido]; // Ensuring pedidos is an array
        } else {
          this.pedidos = []; // Clear pedidos if no order found
        }
      });
    }
  }
}
