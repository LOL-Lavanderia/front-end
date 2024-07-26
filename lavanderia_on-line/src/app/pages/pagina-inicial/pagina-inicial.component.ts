import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order'; // Verifique se o caminho está correto
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service'; // Verifique se o caminho está correto
import { AuthenticationService } from '../../shared/services/authenticationservice/authentication.service'; // Verifique se o caminho está correto

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  listOrder: Order[] = [];
  isEmployee: boolean = false;

  constructor(public pedidoService: PedidoService, public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.pedidoService.listOpenOrders().subscribe((orders: Order[]) => {
      let filteredOrders = orders.filter(order => order.status === 'Em Aberto'); // Filtra todos os pedidos em aberto assim que são recebidos
      
      if (this.authService.getRole() === 'employee') {
        this.listOrder = filteredOrders;
        this.isEmployee = true;
      } else {
        const clienteId = this.authService.getCurrentUserId(); // Certifique-se de que getCurrentUserId retorna o ID correto
        this.listOrder = filteredOrders.filter(order => order.clienteId === clienteId);
      }
      
      // Ordena os pedidos por data
      this.listOrder.sort((a, b) => new Date(b.openDate).getTime() - new Date(a.openDate).getTime());
    });
  }

  confirmarRecolhimento(order: Order): void {
    order.status = 'Recolhido';
    this.pedidoService.createOrUpdatePedido(order, order.id).subscribe(() => {
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