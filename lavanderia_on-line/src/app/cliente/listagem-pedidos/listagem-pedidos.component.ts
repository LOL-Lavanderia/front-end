import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrl: './listagem-pedidos.component.css'
})

export class ListagemPedidosComponent implements OnInit {
  constructor(public orderService: PedidoService,
        // private authService: AuthService
    ) { }

  listOrder: Order[] = this.orderService.listOrder;
  isEmployee: boolean = false;

  ngOnInit(): void {
    // this.listOrder = this.orderService.listOrder;
    // this.listOrder.sort((a, b) => {
    //   const dateA = new Date(a.openDate);
    //   const dateB = new Date(b.openDate);
    //   return dateB.getTime() - dateA.getTime();
    // });
   // this.isEmployee = !!this.authService.isEmployee();
  }
  //cria uma lista fake de pedidos para o listOrder
  // id: number = 0;
  // time: number = 0;
  // status: string = 'Em Aberto';
  // value: number = 0;
  // closeDate: Date = new Date();
  // openDate: Date = new Date();
  // roupas: Roupa[] = [];
  listOrderF: Order[] = [
    new Order(1, 50),
    new Order(2, 100),
    new Order(3, 150),
    new Order(4, 200),
    new Order(5, 250),
    new Order(6, 300),
    new Order(7, 350),
    new Order(8, 400),
    new Order(9, 450),
    new Order(10, 500),
  ]
  confirmarRecolhimento(order: Order): void {
    order.status = 'Recolhido';
    this.orderService.updateOrder(order);
    alert(`Pedido Recolhido!\nNúmero de Pedido: ${order.id}`);
  }

  confirmarLavagem(order: Order): void {
    order.status = 'Aguardando pagamento';
    this.orderService.updateOrder(order);
    alert(`Pedido Lavado!\nNúmero de Pedido: ${order.id}`);
  }

  finalizarPedido(order: Order): void {
    order.status = 'Finalizado';
    this.orderService.updateOrder(order);
    alert(`Pedido Finalizado!\nNúmero de Pedido: ${order.id}`);
  }


  pagarPedido(order: Order): void {
    order.status = 'Pago';
    this.orderService.updateOrder(order);
    alert(`Pedido Pago!\nNúmero de Pedido: ${order.id}`);
  }

  cancelarPedido(order: Order): void {
    order.status = 'Cancelado';
    this.orderService.updateOrder(order);
    alert(`Pedido Cancelado!\nNúmero de Pedido: ${order.id}`);
  }


}
