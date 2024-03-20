import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../../shared/models/pedido/pedido.model';
import { PedidoService } from '../../../shared/services/pedidoservice/pedido.service.service';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-abertos',
  standalone: true,
  templateUrl: './pedidos-abertos.component.html',
  styleUrl: './pedidos-abertos.component.css',
  imports: [
    MatTableModule,
    MatIcon,
    CommonModule
  ]
})
export class PedidosAbertosComponent {

  pedidos: Pedido[] = [];
  displayedColumns: string[] = ['id', 'createdAt', 'term', 'status', 'actions'];

  constructor(private router: Router, private pedidoService: PedidoService) { }

  returnHomePage(): void {
    this.router.navigate(['/admin_homepage'])
  }

  novoPedido(): void {
    this.router.navigate(['/inserir_pedido']); // 3. Use o método navigate
  }

  excluirPedido(id: number): void {
    this.pedidoService.deletePedido(id).subscribe(() => {
      this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
    }, error => {
      console.error(`Error when trying to delete pedido with id ${id}`, error);
    });
  }


  ngOnInit(): void {
    if (this.pedidos) {
      this.pedidoService.listAll().subscribe(data => {
        this.pedidos = data;
      }, error => {
        // Você pode adicionar tratamento de erro aqui
        console.error('Erro ao buscar itens', error);
      });
    } else {
      // Lidar com erro - usuário não logado
      console.warn('Usuário não está logado');
    }
  }

  goToUpdatePage(pedidoId: number): void {
    // Navigates to the update pedido page with the pedido ID
    this.router.navigate(['/atualizar-pedido', pedidoId]);
  }
}
