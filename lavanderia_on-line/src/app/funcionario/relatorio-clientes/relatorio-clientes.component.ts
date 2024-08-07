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
  
          // Format phone numbers to have parentheses around the first two digits
          cliente.role.telefones.forEach(telefone => {
            // Converte o número de telefone para string antes de adicionar parênteses
            telefonesStr += `(${telefone.numero.toString().slice(0, 2)}) ${telefone.numero.toString().slice(2)}\n`;
          });
  
          // Formata o CPF para incluir pontos e traços
          const cpfFormatado = cliente.role.cpf.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1})$/, '$1-$2');
  
          // Retorna um array contendo o nome, email, CPF formatado, endereços e telefones formatados
          return [
            cliente.nome,
            cliente.email,
            cpfFormatado,
            enderecosStr.trim(), // Remove o caractere de nova linha final
            telefonesStr.trim() // Remove o caractere de nova linha final
          ];
        }
  
        return []; // Retorna um array vazio para roles não-clientes
      });
  
    const columns = ['Nome', 'Email', 'CPF', 'Endereços', 'Telefones'];
  
    // @ts-ignore
    doc.autoTable({
      head: [columns],
      body: data.filter(row => row.length > 0), // Filtras linhas vazias
      startY: 20
    });
  
    doc.save('relatorio_clientes.pdf');
  }
}
