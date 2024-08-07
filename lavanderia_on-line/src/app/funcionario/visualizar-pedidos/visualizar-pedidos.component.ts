import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-visualizar-pedidos',
  templateUrl: './visualizar-pedidos.component.html',
  styleUrls: ['./visualizar-pedidos.component.css'],
  providers: [DatePipe],
})
export class VisualizarPedidosComponent implements OnInit {
  listOrder: Order[] = [];
  filteredOrders: Order[] = [];
  selectedFilter: string = '';
  startDate: Date | null = new Date();
  endDate: Date | null = new Date();

  constructor(private pedidoService: PedidoService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.pedidoService.listAll().subscribe((orders) => {
      this.listOrder = orders.sort((a, b) => new Date(b.closeDate).getTime() - new Date(a.closeDate).getTime());
      this.applyFilter();
    });
    this.sortOrdersByCloseDateDesc();
  }

  sortOrdersByCloseDateDesc(): void {
    this.listOrder.sort((a, b) => {
      const dateA = new Date(a.closeDate).getTime();
      const dateB = new Date(b.closeDate).getTime();
      return dateB - dateA; // Ordena de forma decrescente
    });
  }

  applyFilter(): void {
    if (this.selectedFilter === 'today') {
      this.filterToday();
    } else if (this.selectedFilter === 'dateRange') {
      this.filterByDateRange();
    } else {
      this.filteredOrders = [...this.listOrder.sort((a, b) => new Date(b.closeDate).getTime() - new Date(a.closeDate).getTime())];
    }
  }

  filterToday(): void {
    const today = moment().format('YYYY-MM-DD');
    this.filteredOrders = this.listOrder.filter(order => {
      if (order.openDate) {
        const openDate = moment(order.openDate).format('YYYY-MM-DD');
        return openDate === today;
      }
      return false;
    });
  }

  filterByDateRange(): void {
    if (this.startDate && this.endDate) {
      const start = moment(this.startDate).format('YYYY-MM-DD');
      const end = moment(this.endDate).format('YYYY-MM-DD');
      this.filteredOrders = this.listOrder.filter(order => {
        if (order.openDate) {
          const openDate = moment(order.openDate).format('YYYY-MM-DD');
          return openDate >= start && openDate <= end;
        }
        return false;
      });
    }
  }

  onStartDateChange(event: any): void {
    this.startDate = event.value;
    this.applyFilter();
  }

  onEndDateChange(event: any): void {
    this.endDate = event.value;
    this.applyFilter();
  }

  confirmarRecolhimento(order: Order): void {
    order.status = 'Recolhido';
    this.pedidoService.createOrUpdatePedido(order, order.id).subscribe(() => {
      alert(`Pedido Recolhido!\nNúmero de Pedido: ${order.id}`);
      this.applyFilter();
    });
  }

  confirmarLavagem(order: Order): void {
    order.status = 'Aguardando pagamento';
    this.pedidoService.createOrUpdatePedido(order, order.id).subscribe(() => {
      alert(`Pedido Lavado!\nNúmero de Pedido: ${order.id}`);
      this.applyFilter();
    });
  }

  finalizarPedido(order: Order): void {
    order.status = 'Finalizado';
    this.pedidoService.createOrUpdatePedido(order, order.id).subscribe(() => {
      alert(`Pedido Finalizado!\nNúmero de Pedido: ${order.id}`);
      this.applyFilter();
    });
  }

  pagarPedido(order: Order): void {
    order.status = 'Pago';
    this.pedidoService.createOrUpdatePedido(order, order.id).subscribe(() => {
      alert(`Pedido Pago!\nNúmero de Pedido: ${order.id}`);
      this.applyFilter();
    });
  }

  noMatchesFound(): boolean {
    if (!this.selectedFilter) {
      return false;
    }
    return this.filteredOrders.length === 0;
  }
}
