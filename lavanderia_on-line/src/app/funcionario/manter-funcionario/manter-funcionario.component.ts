import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/funcionarioservice/usuario.service';
import { Usuario, isEmployee } from '../../shared/models/usuario/usuario';
import { MatDialog } from '@angular/material/dialog';
import { ModalFuncionarioComponent } from './modal-funcionario/modal-funcionario.component';

@Component({
  selector: 'app-manter-funcionario',
  templateUrl: './manter-funcionario.component.html',
  styleUrl: './manter-funcionario.component.css',
})
export class ManterFuncionarioComponent implements OnInit {

  employees: Usuario[] = [];
  newEmployee: Usuario = new Usuario(undefined, '', '', '', { role: 'employee', birthDate: '' });

  displayedColumns: string[] = [ 'email', 'name', 'birthDate', 'actions'];

  constructor(
    public dialog: MatDialog,
    private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.listAll().pipe().subscribe((users) => {
      this.employees = users.filter(user => isEmployee(user));
    }
    );
  }

  openNewEmployeeModal(): void {
    this.openEmployeeModal(new Usuario(undefined, '', '', '', { role: 'employee', birthDate: '' }));
  }

  openEmployeeModal(employee: Usuario): void {
    const dialogRef = this.dialog.open(ModalFuncionarioComponent, {

      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.listAll().pipe().subscribe((users) => {
        this.employees = users.filter(user => isEmployee(user));
      });
    });
  }

  deleteFuncionario(employee: Usuario): void {
    if (confirm(`Deseja realmente excluir o funcionário ${employee.nome}?`)) {
      this.userService.deleteUser(employee.id!).pipe().subscribe(() => {
        this.employees = this.employees.filter((e) => e.id !== employee.id);
      });
    }
  }
}

