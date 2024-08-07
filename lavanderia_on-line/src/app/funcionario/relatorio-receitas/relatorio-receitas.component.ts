import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { RelatorioService } from '../../shared/services/relatorioservice/relatorio.serivce';
import { PedidoDTO, RelatorioReceitaResponse } from '../../shared/models/relatorios';
import moment from 'moment';
import 'jspdf-autotable';

@Component({
  selector: 'app-relatorio-receitas',
  templateUrl: './relatorio-receitas.component.html',
  styleUrls: ['./relatorio-receitas.component.css']
})
export class RelatorioReceitasComponent implements OnInit {
  public dataInicial: Date | undefined;
  public dataFinal: Date | undefined;

  relatorio: RelatorioReceitaResponse = {
    pedidos: [], 
    totalReceita: 0
  };

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {}

  public mensagemErro: string | null = null;

  onDataInicialChange(event: any): void {
    this.dataInicial = event.value;
  }

  onDataFinalChange(event: any): void {
    this.dataFinal = event.value;
  }

  gerarRelatorio() {
    if (this.dataInicial !== undefined && this.dataFinal !== undefined) {
      if (new Date(this.dataInicial) > new Date(this.dataFinal)) {
        this.mensagemErro = 'A data inicial não pode ser maior que a data final.';
        return;
      }
      this.mensagemErro = null;
      const dataInicialFormatada = moment(this.dataInicial).format('YYYY-MM-DDTHH:mm:ss.SSS');
      const dataFinalFormatada = moment(this.dataFinal).format('YYYY-MM-DDTHH:mm:ss.SSS');
      this.relatorioService.gerarRelatorioDeReceitas(dataInicialFormatada, dataFinalFormatada).subscribe(relatorio => {
        this.relatorio = relatorio;
        this.gerarPDF();
      });
    } else {
      this.mensagemErro = null;
      this.relatorioService.gerarRelatorioDeTodoReceitas().subscribe(relatorio => {
        this.relatorio = relatorio;
        this.gerarPDF();
      });
    }         
  }

  @ViewChild('content') content!: ElementRef;

  gerarPDF() {
    const doc = new jsPDF();
    
    doc.text('Relatório de Receitas', 10, 10);
    
    // Mapeia os pedidos para o formato necessário para o autoTable
    const data = this.relatorio.pedidos.map((pedido: PedidoDTO) => {
      return [
        pedido.id,
        pedido.value.toFixed(2),
        moment(pedido.openDate).format('DD/MM/YYYY') // Formato brasileiro
      ];
    });
  
    const columns = ['ID do Pedido', 'Valor (R$)', 'Data de Abertura'];
    
    // @ts-ignore
    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20
    });
    
    // Calcula e adiciona a receita total ao PDF
    const receitaTotal = this.relatorio.pedidos.reduce((acc, pedido) => acc + pedido.value, 0);
    const receitaTotalTexto = `Receita Total: R$ ${receitaTotal.toFixed(2)}`;
    // @ts-ignore
    doc.text(receitaTotalTexto, 10, doc.autoTable.previous.finalY + 10);
    
    doc.save('relatorio_receitas.pdf');
  }
}
