import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import { Pedido } from '../../shared/models/pedido/pedido.model';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizar-pedidos',
  standalone: true,
  templateUrl: './visualizar-pedidos.component.html',
  styleUrl: './visualizar-pedidos.component.css',
  imports: [
    MatTableModule,
    MatIcon,
    CommonModule
  ]
})
export class VisualizarPedidosComponent {
  pedidos: Pedido[] = [];
  displayedColumns: string[] = ['id', 'createdAt', 'term', 'status', 'actions'];

  constructor(private router: Router, private pedidoService: PedidoService) { }

  ngOnInit(): void {
   this.loadPedidos();
  }

  loadPedidos(){
    this.pedidoService.listAll().subscribe(data => {
      this.pedidos = data;
   }, error => {
      console.error('Erro ao recarregar a lista de pedidos', error);
   });
  }

  recolherPedido(id: number) {
    
    const pedido = this.pedidos.find(p => p.id === id);
   
    if (pedido) {
      
       pedido.status = 'Recolhido';
   
      
       this.pedidoService.updatePedido(id, pedido).subscribe(
         success => {
         
           this.loadPedidos();
         },
         error => {
        
           console.error('Erro ao recolher o pedido:', error);
         }
       );
    } else {
   
       console.error('Pedido não encontrado:', id);
    }
   }

   solicitaPagamentoPedido(id: number) {

    const pedido = this.pedidos.find(p => p.id === id);
   
    if (pedido) {
    
       pedido.status = 'Aguardando Pagamento';
   
       this.pedidoService.updatePedido(id, pedido).subscribe(
         success => {
      
           this.loadPedidos();
         },
         error => {
          
           console.error('Erro ao recolher o pedido:', error);
         }
       );
    } else {
      
       console.error('Pedido não encontrado:', id);
    }
   } 

   finalizarPedido(id: number) {

    const pedido = this.pedidos.find(p => p.id === id);
   
    if (pedido) {
    
       pedido.status = 'Finalizar Pedido';
   
       this.pedidoService.updatePedido(id, pedido).subscribe(
         success => {
      
           this.loadPedidos();
         },
         error => {
          
           console.error('Erro ao recolher o pedido:', error);
         }
       );
    } else {
      
       console.error('Pedido não encontrado:', id);
    }
   } 
  
}
