import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-relatorio-receitas',
  templateUrl: './relatorio-receitas.component.html',
  styleUrl: './relatorio-receitas.component.css'
})
export class RelatorioReceitasComponent implements OnInit {
  ngOnInit(): void {
      
  }   
  
  public dataInicial: Date | null = null;
  public dataFinal: Date | null = null;
  constructor() {}
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

  gerarRelatorio() {
      let dataInicialISO = '';
      let dataFinalISO = '';

      if (this.dataInicial && this.dataFinal) {
          dataInicialISO = this.dataInicial.toISOString().split('T')[0];
          dataFinalISO = this.dataFinal.toISOString().split('T')[0];
      }

      const receitasFiltradas = this.receitas.filter(receita => {
          if (dataInicialISO && dataFinalISO) {
              const dataReceita = receita.data;
              return dataReceita >= dataInicialISO && dataReceita <= dataFinalISO;
          } else {
              return true;
          }
      });

      if (receitasFiltradas.length === 0) {
          alert('Nenhuma receita encontrada para o período selecionado ou todas as receitas.');
          return;
      }

      const doc = new jsPDF();

      doc.text('Relatório de Receitas', 10, 10);

      const data = receitasFiltradas.map(receita => [
          receita.data,
          `R$ ${receita.valor.toFixed(2)}`
      ]);

      const columns = ['Data', 'Valor'];

      // @ts-ignore
      doc.autoTable({
          head: [columns],
          body: data,
          startY: 20
      });

      const fileName = 'relatorio_receitas.pdf';

      doc.save(fileName);
  }
}
