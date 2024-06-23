import { Component, Inject, OnInit } from '@angular/core';
import { Employee, Usuario } from '../../../shared/models/usuario/usuario';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/funcionarioservice/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-funcionario',
  styleUrl: './modal-funcionario.component.css',
  templateUrl: './modal-funcionario.component.html',
})
export class ModalFuncionarioComponent implements OnInit {
    employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private dialogRef: DialogRef, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    this.employeeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getFuncionario(this.data);
  }

  getFuncionario(user: Usuario) {
    console.log(user);
    this.employeeForm.setValue({
      email: user.email,
      name: user.name,
      password: user.password,
      birthDate: (user.role as Employee).birthDate,
    });
  }

  onDateChange(event: any) {
    const date = new Date(event);
    this.employeeForm.patchValue({
      birthDate: date
    });
  }

  submitForm() {
    if (this.employeeForm.dirty) {
      if (this.employeeForm.valid && this.data.id) {
        const formObj = this.employeeForm.value;
        const employee = new Usuario(this.data.id, formObj.email, formObj.name, formObj.password, { role: 'employee', birthDate: formObj.birthDate });
        this.userService.updateUser(employee).pipe().subscribe(() => {
          this.toastr.success('Funcionário atualizado com sucesso!');
          this.closeModal();
        });

      }
      else if (this.employeeForm.valid) {
        const formObj = this.employeeForm.value;
        const employee = new Usuario(undefined, formObj.email, formObj.name, formObj.password, { role: 'employee', birthDate: formObj.birthDate });
        this.userService.updateUser(employee).pipe().subscribe(() => {
          this.toastr.success('Funcionário criado com sucesso!');
          this.dialogRef.close();
        });
      }
    }
    else {
      this.toastr.info('Nenhuma alteração foi feita!');

    }
  }

  // Funções para acessar os controles do formulário facilmente no template
  get email() { return this.employeeForm.get('email'); }
  get name() { return this.employeeForm.get('name'); }
  get password() { return this.employeeForm.get('password'); }
  get birthDate() { return this.employeeForm.get('birthDate'); }

  closeModal() {
    if (this.employeeForm.dirty) {
      if (confirm('Deseja sair sem salvar?')) {
        this.dialogRef.close();
      }
    }
    else
    this.dialogRef.close();
  }
}
