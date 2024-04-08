import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import { MaterialModule } from '../../components/material/material.module';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrl: './listagem-pedidos.component.css',
})

export class ListagemPedidosComponent implements OnInit {

  constructor(public pedidoService: PedidoService,
    // private authService: AuthService
    ) { }

  listOrder: Order[] = this.pedidoService.listOrder;
  isEmployee: boolean = false;
  selectedOrderStatus: string = '';

  ngOnInit(): void {
    this.listOrder = this.pedidoService.listOrder;
    this.listOrder.sort((a, b) => {
      const dateA = new Date(a.openDate);
      const dateB = new Date(b.openDate);
      return dateB.getTime() - dateA.getTime();
    });
    // this.isEmployee = !!this.authService.isEmployee();
  }
  foundMatchStatus(orderStatus: string): boolean {
    if (!this.selectedOrderStatus) {
      return true;
    }
    return orderStatus === this.selectedOrderStatus;
  }
  noMacthesFound(): boolean {
    if (!this.selectedOrderStatus) {
      return false;
    }
    return this.listOrder.every(o => o.status !== this.selectedOrderStatus);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listOrder = this.pedidoService.listOrder.filter(order => order.id.toString().includes(filterValue));
  }

  confirmarRecolhimento(order: Order): void {
    order.status = 'Recolhido';
    this.pedidoService.updateOrder(order);
    alert(`Pedido Recolhido!\nNúmero de Pedido: ${order.id}`);
  }

  confirmarLavagem(order: Order): void {
    order.status = 'Aguardando pagamento';
    this.pedidoService.updateOrder(order);
    alert(`Pedido Lavado!\nNúmero de Pedido: ${order.id}`);
  }

  finalizarPedido(order: Order): void {
    order.status = 'Finalizado';
    this.pedidoService.updateOrder(order);
    alert(`Pedido Finalizado!\nNúmero de Pedido: ${order.id}`);
  }


  pagarPedido(order: Order): void {
    order.status = 'Pago';
    this.pedidoService.updateOrder(order);
    alert(`Pedido Pago!\nNúmero de Pedido: ${order.id}`);
  }

  cancelarPedido(order: Order): void {
    order.status = 'Cancelado';
    this.pedidoService.updateOrder(order);
    alert(`Pedido Cancelado!\nNúmero de Pedido: ${order.id}`);
  }


}
