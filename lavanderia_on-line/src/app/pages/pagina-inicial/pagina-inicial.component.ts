import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import { AuthenticationService } from '../../shared/services/authenticationservice/authentication.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  listOrder: Order[] = [];
  isEmployee: boolean = false;
  selectedOrderStatus: string = '';

  constructor(public pedidoService: PedidoService, public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadOrders();
    this.pedidoService. listOpenOrders().subscribe((orders: Order[]) => {
      this.listOrder = orders;
      this.listOrder.sort((a, b) => {
        const dateA = new Date(a.openDate);
        const dateB = new Date(b.openDate);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  loadOrders(): void {
    if (this.authService.getRole() === 'employee') {
     // Filtrar todos os pedidos abertos
      this.listOrder = this.listOrder.filter(order => order.status === 'Em Aberto');
   } else {
     // Supondo que o usuário seja um cliente, filtrar apenas os pedidos abertos desse cliente
    //  Substitua 'clienteId' pelo ID real do cliente
      const clienteId = this.authService.getCurrentUserId();
      this.listOrder = this.listOrder.filter(order => order.status === 'Em Aberto' && order.clienteId === clienteId);
   }
  }

  confirmarRecolhimento(order: Order): void {
    order.status = 'Recolhido';
    this.pedidoService.createOrUpdatePedido( order, order.id).subscribe(() => {
      alert(`Pedido Recolhido!\nNúmero de Pedido: ${order.id}`);
    });
  }

  cancelarPedido(order: Order): void {
    order.status = 'Cancelado';
    this.pedidoService.createOrUpdatePedido(order, order.id).subscribe(() => {
      alert(`Pedido Cancelado!\nNúmero de Pedido: ${order.id}`);
    });
  }

}
