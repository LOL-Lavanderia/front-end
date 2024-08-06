import { Component, Inject, OnInit } from '@angular/core';
import { RoupaService } from '../../../../shared/services/roupa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Roupa } from '../../../../shared/models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-roupa',
  templateUrl: './modal-roupa.component.html',
  styleUrl: './modal-roupa.component.css'
})
export class ModalRoupaComponent implements OnInit {
  roupaForm: FormGroup;

constructor(private fb: FormBuilder, private roupaService: RoupaService, private dialogRef:
   DialogRef, private toastr: ToastrService,
  @Inject(MAT_DIALOG_DATA) public data: Roupa
) {
  this.roupaForm = this.fb.group({
    nome:  ['', Validators.required],
    valor: ['', Validators.required],
    prazo: ['', Validators.required]
  });
}

ngOnInit(): void {
  this.getRoupa(this.data);
}

getRoupa(roupa: Roupa) {
  console.log(roupa);
  this.roupaForm.setValue({
    nome: roupa.name,
    valor: roupa.price,
    prazo: roupa.time
  });
}

submitForm() {
  if (this.roupaForm.dirty) {
    if (this.roupaForm.valid && this.data.id) {
      const formObj = this.roupaForm.value;
      const roupa = new Roupa(this.data.id, formObj.nome, formObj.valor, undefined, formObj.prazo);
      this.roupaService.alterar(roupa).pipe().subscribe(() => {
        this.toastr.success('Roupa atualizada com sucesso!');
        this.closeModal();
      });

    }
    else if (this.roupaForm.valid) {
      const formObj = this.roupaForm.value;
      const roupa = new Roupa(undefined, formObj.nome, formObj.valor, undefined, formObj.prazo);
      this.roupaService.inserirRoupa(roupa).pipe().subscribe(() => {
        this.toastr.success('Roupa criada com sucesso!');
        this.dialogRef.close();
      });
    }
  }
  else {
    this.toastr.info('Nenhuma alteração foi feita!');

  }
}

// Funções para acessar os controles do formulário facilmente no template
get nome() { return this.roupaForm.get('nome'); }
get valor() { return this.roupaForm.get('valor'); }
get prazo() { return this.roupaForm.get('prazo'); }

closeModal() {
  this.dialogRef.close();
}
}
