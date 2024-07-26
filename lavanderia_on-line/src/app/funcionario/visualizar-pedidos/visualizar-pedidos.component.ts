import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import { DatePipe } from '@angular/common';

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
  startDate: string;
  endDate: string;

  constructor(private pedidoService: PedidoService, private datePipe: DatePipe) {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.startDate = today;
    this.endDate = today;
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.pedidoService.listAll().subscribe((orders) => {
      this.listOrder = orders;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (this.selectedFilter === 'today') {
      this.filterToday();
    } else if (this.selectedFilter === 'dateRange') {
      this.filterByDateRange();
    } else {
      this.filteredOrders = [...this.listOrder];
    }
  }

  filterToday(): void {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.filteredOrders = this.listOrder.filter(order => {
      if (order.openDate) {
        const openDate = this.datePipe.transform(order.openDate, 'yyyy-MM-dd');
        return openDate === today;
      }
      return false;
    });
  }

  filterByDateRange(): void {
    if (this.startDate && this.endDate) {
      this.filteredOrders = this.listOrder.filter(order => {
        if (order.openDate) {
          const openDate = this.datePipe.transform(order.openDate, 'yyyy-MM-dd');
          return openDate! >= this.startDate && openDate! <= this.endDate;
        }
        return false;
      });
    }
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