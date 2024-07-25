import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-fieis',
  templateUrl: './relatorio-fieis.component.html',
  styleUrl: './relatorio-fieis.component.css'
})
export class RelatorioFieisComponent implements OnInit {
  clientesFieis: any[] = [];

  constructor(
    // private authService: AuthService,
     private pedidoService: PedidoService) { }

  ngOnInit(): void {

          

      // const clientes = this.authService.getUsersByRole('cliente');
      const pedidos = [
          { clientId: 3, value: 500 },
          { clientId: 4, value: 800 },
          { clientId: 5, value: 300 },
      ];

      const clientesInfo: { [key: number]: any } = {};

      // for (const cliente of clientes) {
      //     const clientePedidos = pedidos.filter(pedido => pedido.clientId === cliente.id);
      //     const receitaTotal = clientePedidos.reduce((total, pedido) => total + pedido.value, 0);
      //     const numPedidos = clientePedidos.length;

      //     if (cliente.id !== undefined) {
      //         clientesInfo[cliente.id] = { name: cliente.name, numPedidos, receitaTotal };
      //     }
      // }

      const clientesOrdenados = Object.values(clientesInfo).sort((a, b) => b.receitaTotal - a.receitaTotal);

      this.clientesFieis = clientesOrdenados.slice(0, 3);
  }

  generatePDF() {
      const doc = new jsPDF();

      doc.text('Relatório de Clientes Fiéis', 10, 10);

      const data = this.clientesFieis.map(cliente => [
          cliente.name,
          cliente.numPedidos,
          `R$ ${cliente.receitaTotal.toFixed(2)}`
      ]);

      const columns = ['Cliente', 'Quantidade de Pedidos', 'Receita Total'];

      // @ts-ignore
      doc.autoTable({
          head: [columns],
          body: data,
          startY: 20
      });

      const fileName = 'relatorio_clientes_fieis.pdf';

      doc.save(fileName);
  }
}
