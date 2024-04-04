import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../../shared/models/funcionario/funcionario.model';
import { FuncionarioService } from '../../shared/services/funcionarioservice/funcionario.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manter-funcionario',
  standalone: true,
  templateUrl: './manter-funcionario.component.html',
  styleUrl: './manter-funcionario.component.css',
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule
  ]
})
export class ManterFuncionarioComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  displayedColumns: string[] = ['id', 'email', 'name', 'birthDate', 'actions'];

  constructor(private router: Router, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarioService.listAll().subscribe(data => {
      this.funcionarios = data;
    }, error => {
      console.error('Error fetching funcionario', error);
    });
  }

  deleteFuncionario(id: number): void {
    this.funcionarioService.deleteFuncionario(id).subscribe(() => {
      this.funcionarios = this.funcionarios.filter(funcionario => funcionario.id !== id);
    }, error => {
      console.error(`Error when trying to delete funcionario with id ${id}`, error);
    });
  }

  goToUpdatePage(funcionarioId: number): void {
    this.router.navigate(['/update-funcionario', funcionarioId]);
  }

  novoFuncionario(): void {
    this.router.navigate(['/cadastrar-funcionario']); // Substitua '/cadastrar-funcionario' pelo caminho correto do seu app
  }

}

