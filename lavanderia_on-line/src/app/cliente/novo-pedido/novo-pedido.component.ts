import { Component, OnInit } from '@angular/core';
import { Roupa } from '../../shared/models/roupa';
import { Order } from '../../shared/models/order';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import { MaterialModule } from '../../components/material/material.module';
import { RoupaService } from '../../shared/services/roupa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.css'],
})
export class NovoPedidoComponent implements OnInit{
  listaDeRoupas: Roupa[] = [];

  showOrcamento: boolean = false;
  value: number = 0;
  time: number = 0;
  newOrder: Order = new Order(0, 0);
  order: any;

  constructor(private pedidoService: PedidoService,
    private toastr: ToastrService,
    private roupasService: RoupaService) { }

ngOnInit(): void {
    this.roupasService.listarRoupas().pipe().subscribe((roupas) => {
      this.listaDeRoupas = roupas;
      console.log(this.listaDeRoupas);
    }
    );
}

  private orderNumberCounter: number = 1;


  calculateValue(): void {
    this.value = this.listaDeRoupas.reduce((sum, item) => sum + ((item.quantity ?? 0) * (item.price ?? 0)), 0);
  }

  calculateTime(): void {
    if (this.listaDeRoupas.length > 0) {
      let short = this.listaDeRoupas[0].time ?? 0;
      for (const element of this.listaDeRoupas) {
        if (element.time !== undefined && element.quantity! > 0) {
          short = Math.min(element.time, short);
        }
      }
      this.time = short;
    }
  }

  isOrderValid(): boolean {
    return this.listaDeRoupas.some(item => item.quantity !== undefined && item.quantity > 0);
  }

  //gera um id numerico para o pedido
  generateId(): string {
    const n =  Math.floor(Math.random() * 1000);
    return n.toString();
  }

  //gera um pedido
  generateOrder(): void {
    this.calculateTime();
    this.calculateValue();

    this.newOrder = new Order(this.orderNumberCounter, this.value);
    this.orderNumberCounter++;
    this.newOrder.id = this.generateId();
    this.newOrder.time = this.time;
    this.newOrder.openDate = new Date();
    this.insertClothes(this.newOrder);
    this.showOrcamento = true;
  }

  multiplicaPrecoXQuantidade(roupa: Roupa): number {
    return (roupa.price ?? 0) * (roupa.quantity ?? 0);
  }

  insertClothes(order: Order): void {
    console.log("ANTES");
    console.log(this.listaDeRoupas);
    for (const roupas of this.listaDeRoupas) {
      if (roupas.quantity! > 0) {
        let copyRoupas = { ...roupas };
        order.addRoupas(copyRoupas);
      }
    }
    console.log("DEPOIS");
    console.log(this.listaDeRoupas);
  }

  sendOrder(): void {
    console.log( this.newOrder);
    this.showOrcamento = false;
    this.pedidoService.createOrUpdatePedido(this.newOrder, undefined).pipe().subscribe(() => {
      this.toastr.success(`Orçamento Enviado!\nNúmero de Pedido: ${this.newOrder.id}`);
    }
    );


    this.listaDeRoupas.forEach(item => item.quantity = 0);
    this.value = 0;
    this.time = 0;
    this.showOrcamento = false;
  }

  declineOrder(): void {
    this.showOrcamento = false;
    this.newOrder.status = 'Rejeitado';
    this.pedidoService.createOrUpdatePedido(this.newOrder, undefined).pipe().subscribe(() => {
      this.toastr.warning(`Orçamento Rejeitado!\nNúmero de Pedido: ${this.newOrder.id}`);
    }
    );
    this.listaDeRoupas.forEach(item => item.quantity = 0);
    this.value = 0;
    this.time = 0;
    this.showOrcamento = false;
  }
}
