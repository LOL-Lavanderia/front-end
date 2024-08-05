import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { RelatorioService } from '../../shared/services/relatorioservice/relatorio.serivce';
import { PedidoDTO, RelatorioReceitaResponse } from '../../shared/models/relatorios';
import moment from 'moment';


@Component({
  selector: 'app-relatorio-receitas',
  templateUrl: './relatorio-receitas.component.html',
  styleUrl: './relatorio-receitas.component.css'
})
export class RelatorioReceitasComponent implements OnInit {
    relatorio: RelatorioReceitaResponse = {
        pedidos: [], 
        totalReceita: 0
      };

      constructor(private relatorioService: RelatorioService) {}


      ngOnInit(): void {
      }
    
      gerarRelatorio() {
        const dataInicialFormatada = moment(this.dataInicial).format('YYYY-MM-DDTHH:mm:ss.SSS');
        const dataFinalFormatada = moment(this.dataFinal).format('YYYY-MM-DDTHH:mm:ss.SSS');
        this.relatorioService.gerarRelatorioDeReceitas(dataInicialFormatada, dataFinalFormatada).subscribe(relatorio => {
          this.relatorio = relatorio;
          this.gerarPDF();
        });
      }
    
  
  public dataInicial: Date | undefined;
  public dataFinal: Date | undefined;

  @ViewChild('content') content!: ElementRef;

gerarPDF() {
    const doc = new jsPDF();

    let y = 20;
    let receitaTotal = 0;
    doc.text('Relatório de Receitas',10,10);
    this.relatorio.pedidos.forEach((pedido: PedidoDTO, index: number) => {
      const texto = `Pedido ${pedido.id}: R$ ${pedido.value.toFixed(2)}`;
      doc.text(texto, 10, y);
      y += 10;
      receitaTotal += pedido.value;
    });

    const receitaTotalTexto = `Receita Total: R$ ${receitaTotal.toFixed(2)}`;
    doc.text(receitaTotalTexto, 10, y);

    doc.save('relatorio.pdf');
}
}
