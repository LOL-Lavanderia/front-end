import { Component } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})


export class FilterComponent {
  constructor(public pedidoService: PedidoService,
    //private authService: AuthService
    ) { }
  ngOnInit(): void {

    this.listOrder = this.pedidoService.listOrder;
    // this.isEmployee = !!this.authService.isEmployee();

  }
  selectedOrderStatus: string = '';
  isEmployee: boolean = false;
  listOrder: Order[] = this.pedidoService.listOrder;

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
}
