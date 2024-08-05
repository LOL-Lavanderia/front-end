import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { Usuario } from '../../shared/models/usuario/usuario';
import { UserService } from '../../shared/services/funcionarioservice/usuario.service';
import 'jspdf-autotable';
@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrl: './relatorio-clientes.component.css'
})
export class RelatorioClientesComponent implements OnInit {
  clientes: Usuario[] = [];

  constructor(
    private usuarioService: UserService
  ) { }

  ngOnInit(): void {
    this.gerarRelatorio();
    console.log(this.clientes);
  }

  gerarRelatorio(){
    this.usuarioService.getUsersByRole('client').subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  generatePDF() {
    const doc = new jsPDF();
  
    doc.text('Relatório de Clientes', 10, 10);
  
    const data = this.clientes
      .filter(cliente => cliente.role.role === 'client')
      .map(cliente => {
        let enderecosStr = '';
        let telefonesStr = '';
  
        if (cliente.role.role === 'client') {
          // Concatenate all addresses into a single string
          cliente.role.enderecos.forEach(endereco => {
            enderecosStr += `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.localidade}, ${endereco.cep}\n`;
          });
  
          // Concatenate all phones into a single string
          cliente.role.telefones.forEach(telefone => {
            telefonesStr += `${telefone.numero}\n`;
          });
  
          // Return an array containing the client's name, email, CPF, addresses, and phones
          return [
            cliente.nome,
            cliente.email,
            cliente.role.cpf,
            enderecosStr.trim(), // Trim to remove the trailing newline
            telefonesStr.trim() // Trim to remove the trailing newline
          ];
        }
  
        return []; // Return an empty array for non-client roles
      });
  
    const columns = ['Nome', 'Email', 'CPF', 'Endereços', 'Telefones'];
  
    // @ts-ignore
    doc.autoTable({
      head: [columns],
      body: data.filter(row => row.length > 0), // Filter out any empty rows
      startY: 20
    });
  
    doc.save('relatorio_clientes.pdf');
  }  
}
