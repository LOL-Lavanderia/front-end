import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  listOrder: Order[] = [];
  isEmployee: boolean = true;
  selectedOrderStatus: string = '';

  constructor(public pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.loadOrders();
    // Comentei o código relacionado ao authService para simplificar
    /*
    this.listOrder = this.pedidoService.listOrder;
    this.listOrder.sort((a, b) => {
       const dateA = new Date(a.openDate);
       const dateB = new Date(b.openDate);
       return dateB.getTime() - dateA.getTime();
    });

    // Verificar se o usuário é um funcionário
    if (this.authService.isEmployee()) {
       // Filtrar todos os pedidos abertos
       this.listOrder = this.listOrder.filter(order => order.status === 'Abertos');
    } else {
       // Supondo que o usuário seja um cliente, filtrar apenas os pedidos abertos desse cliente
       // Substitua 'clienteId' pelo ID real do cliente
       const clienteId = this.authService.getCurrentUserId();
       this.listOrder = this.listOrder.filter(order => order.status === 'Abertos' && order.clientId === clienteId);
    }
    */
  }

  loadOrders(): void {
    this.pedidoService.listAll().subscribe(
      (orders) => {
        this.listOrder = orders;
        this.listOrder.sort((a, b) => {
          const dateA = new Date(a.openDate);
          const dateB = new Date(b.openDate);
          return dateB.getTime() - dateA.getTime();
        });
      },
      (error) => {
        console.error('Erro ao carregar pedidos:', error);
      }
    );
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
