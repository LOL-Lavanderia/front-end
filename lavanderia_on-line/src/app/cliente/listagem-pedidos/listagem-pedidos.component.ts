import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import { AuthenticationService } from '../../shared/services/authenticationservice/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrls: ['./listagem-pedidos.component.css'],
})
export class ListagemPedidosComponent implements OnInit {
  listOrder: Order[] = [];
  filteredOrders: Order[] = [];
  isEmployee: boolean = false;
  selectedOrderStatus: string = '';

  constructor(private pedidoService: PedidoService, public authService: AuthenticationService, private tostr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.getRole() === 'employee') {
      this.isEmployee = true;
    }
    this.loadOrders();
  }

  loadOrders(): void {
    this.pedidoService.getOrdersByClientId(this.authService.getCurrentUserId()).subscribe((orders) => {
      this.listOrder = orders;
      this.applyFilter(); // Aplica o filtro após carregar os pedidos
      this.sortOrdersByCloseDateDesc();
    });
  }

  sortOrdersByCloseDateDesc(): void {
    this.listOrder.sort((a, b) => {
      const dateA = new Date(a.closeDate).getTime();
      const dateB = new Date(b.closeDate).getTime();
      return dateB - dateA; // Ordena de forma decrescente
    });
  }

  applyFilter(): void {
    if (!this.selectedOrderStatus) {
      this.filteredOrders = this.listOrder;
    } else {
      this.filteredOrders = this.listOrder.filter(order => order.status === this.selectedOrderStatus);
    }
  }

  noMatchesFound(): boolean {
    return this.filteredOrders.length === 0;
  }

  confirmarRecolhimento(order: Order): void {
    order.status = 'Recolhido';
    this.pedidoService.createOrUpdatePedido(order, order.id.toString()).subscribe(() => {
      alert(`Pedido Recolhido!\nNúmero de Pedido: ${order.id}`);
      this.loadOrders();
    });
  }

  confirmarLavagem(order: Order): void {
    order.status = 'Aguardando pagamento';
    this.pedidoService.createOrUpdatePedido(order, order.id.toString()).subscribe(() => {
      alert(`Pedido Lavado!\nNúmero de Pedido: ${order.id}`);
      this.loadOrders();
    });
  }

  finalizarPedido(order: Order): void {
    order.status = 'Finalizado';
    this.pedidoService.createOrUpdatePedido(order, order.id.toString()).subscribe(() => {
      alert(`Pedido Finalizado!\nNúmero de Pedido: ${order.id}`);
      this.loadOrders();
    });
  }

  pagarPedido(order: Order): void {
    order.status = 'Pago';
    this.pedidoService.createOrUpdatePedido(order, order.id.toString()).subscribe(() => {
      alert(`Pedido Pago!\nNúmero de Pedido: ${order.id}`);
      this.loadOrders();
    });
  }

  cancelarPedido(order: Order): void {
    if(confirm('Deseja realmente cancelar o pedido?')) {
      order.status = 'Cancelado';
      this.pedidoService.createOrUpdatePedido(order, order.id.toString()).subscribe(() => {
        alert(`Pedido Cancelado!\nNúmero de Pedido: ${order.id}`);
        this.loadOrders();
      });
    }
    else{
      this.tostr.info('Operação cancelada');
    }

  }}