import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../shared/services/pedidoservice/pedido.service.service';
import jsPDF from 'jspdf';
import { RelatorioService } from '../../shared/services/relatorioservice/relatorio.serivce';

@Component({
  selector: 'app-relatorio-fieis',
  templateUrl: './relatorio-fieis.component.html',
  styleUrl: './relatorio-fieis.component.css'
})
export class RelatorioFieisComponent implements OnInit {
  clientesFieis: any[] = [];

  constructor(
    // private authService: AuthService,
     private relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.gerarRelatorio();
  }
  gerarRelatorio(){
    this.relatorioService.getClientesFieis().subscribe(clientes => {
      this.clientesFieis = clientes;
    });
  }


  generatePDF() {
      const doc = new jsPDF();

      doc.text('Relatório de Clientes Fiéis', 10, 10);

      const data = this.clientesFieis.map(cliente => [
          cliente.nomeCliente,
          cliente.quantidadePedidos,
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
