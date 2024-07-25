import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { Usuario } from '../../shared/models/usuario/usuario';

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrl: './relatorio-clientes.component.css'
})
export class RelatorioClientesComponent implements OnInit {
  clientes: Usuario[] = [];

  constructor(
    //private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.clientes = this.authService.getUsersByRole('cliente');
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.text('Relatório de Clientes', 10, 10);

    const data = this.clientes.map(cliente => [
      cliente.nome,
      cliente.email,
      cliente.cpf,
    ]);

    const columns = ['Nome', 'Email', 'CPF'];

    // @ts-ignore
    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20
    });

    doc.save('relatorio_clientes.pdf');
  }
}
