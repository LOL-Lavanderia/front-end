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
        this.relatorioService.gerarRelatorio(dataInicialFormatada, dataFinalFormatada).subscribe(relatorio => {
          this.relatorio = relatorio;
          this.gerarPDF();
        });
      }
    
  
  public dataInicial: Date | undefined;
  public dataFinal: Date | undefined;
//   constructor() {}
  receitas: any[] = [
      { data: '2023-10-02', valor: 100.00 },
      { data: '2023-10-02', valor: 150.00 },
      { data: '2023-10-02', valor: 200.00 },
      { data: '2023-10-02', valor: 100.00 },
      { data: '2023-10-02', valor: 150.00 },
      { data: '2023-10-03', valor: 200.00 },
      { data: '2023-10-04', valor: 100.00 },
      { data: '2023-10-03', valor: 150.00 },
      { data: '2023-10-03', valor: 200.00 },
      { data: '2023-10-04', valor: 100.00 },
      { data: '2023-10-04', valor: 150.00 },
      { data: '2023-10-04', valor: 200.00 },
  ];

  @ViewChild('content') content!: ElementRef;

//   gerarRelatorio() {
//       let dataInicialISO = '';
//       let dataFinalISO = '';

//       if (this.dataInicial && this.dataFinal) {
//           dataInicialISO = this.dataInicial.toISOString().split('T')[0];
//           dataFinalISO = this.dataFinal.toISOString().split('T')[0];
//       }

//       const receitasFiltradas = this.receitas.filter(receita => {
//           if (dataInicialISO && dataFinalISO) {
//               const dataReceita = receita.data;
//               return dataReceita >= dataInicialISO && dataReceita <= dataFinalISO;
//           } else {
//               return true;
//           }
//       });

//       if (receitasFiltradas.length === 0) {
//           alert('Nenhuma receita encontrada para o período selecionado ou todas as receitas.');
//           return;
//       }

//       const doc = new jsPDF();

//       doc.text('Relatório de Receitas', 10, 10);

//       const data = receitasFiltradas.map(receita => [
//           receita.data,
//           `R$ ${receita.valor.toFixed(2)}`
//       ]);

//       const columns = ['Data', 'Valor'];

//       // @ts-ignore
//       doc.autoTable({
//           head: [columns],
//           body: data,
//           startY: 20
//       });

//       const fileName = 'relatorio_receitas.pdf';

//       doc.save(fileName);
//   }

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
