import { Component } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {

  constructor(public pedidoService: PedidoService,
    // private authService: AuthService
    ) { }

  listOrder: Order[] = this.pedidoService.listOrder;
  isEmployee: boolean = true;
  selectedOrderStatus: string = '';

  ngOnInit(): void {
    this.listOrder = this.pedidoService.listOrder;
    this.listOrder.sort((a, b) => {
       const dateA = new Date(a.openDate);
       const dateB = new Date(b.openDate);
       return dateB.getTime() - dateA.getTime();
    });
   
    // // Verificar se o usuário é um funcionário
    // if (this.authService.isEmployee()) {
    //    // Filtrar todos os pedidos abertos
    //    this.listOrder = this.listOrder.filter(order => order.status === 'Abertos');
    // } else {
    //    // Supondo que o usuário seja um cliente, filtrar apenas os pedidos abertos desse cliente
    //    // Substitua 'clienteId' pelo ID real do cliente
    //    const clienteId = this.authService.getCurrentUserId();
    //    this.listOrder = this.listOrder.filter(order => order.status === 'Abertos' && order.clientId === clienteId);
    // }
   }

  confirmarRecolhimento(order: Order): void {
    order.status = 'Recolhido';
    this.pedidoService.updateOrder(order);
    alert(`Pedido Recolhido!\nNúmero de Pedido: ${order.id}`);
  }

  cancelarPedido(order: Order): void {
    order.status = 'Cancelado';
    this.pedidoService.updateOrder(order);
    alert(`Pedido Cancelado!\nNúmero de Pedido: ${order.id}`);
  }

}
