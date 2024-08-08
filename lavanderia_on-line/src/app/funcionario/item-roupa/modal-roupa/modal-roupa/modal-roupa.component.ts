import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RoupaService } from '../../../../shared/services/roupa.service';
import { Roupa } from '../../../../shared/models';
import { CustomCurrencyMaskConfig } from '../../../../app.module';
import { CurrencyMaskConfig } from 'ng2-currency-mask';

@Component({
  selector: 'app-modal-roupa',
  templateUrl: './modal-roupa.component.html',
  styleUrls: ['./modal-roupa.component.css']
})
export class ModalRoupaComponent implements OnInit {
  roupaForm: FormGroup;
  CustomCurrencyMaskConfig: CurrencyMaskConfig = CustomCurrencyMaskConfig;

  constructor(
    private fb: FormBuilder,
    private roupaService: RoupaService,
    private dialogRef: DialogRef,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Roupa
  ) {
    this.roupaForm = this.fb.group({
      nome: ['', [Validators.required, this.lettersOnlyValidator]],
      valor: ['', Validators.required],
      prazo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRoupa(this.data);
  }

  getRoupa(roupa: Roupa) {
    if (roupa) {
      this.roupaForm.setValue({
        nome: roupa.name,
        valor: roupa.price,
        prazo: roupa.time
      });
    }
  }

  lettersOnlyValidator(control: any) {
    const lettersOnly = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (control.value && !lettersOnly.test(control.value)) {
      return { lettersOnly: true };
    }
    return null;
  }

  onInputChange(event: any) {
    const input = event.target.value;
    this.roupaForm.get('nome')?.setValue(input.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''), { emitEvent: false });
  }

  submitForm() {
    if (this.roupaForm.dirty && this.roupaForm.valid) {
      const formObj = this.roupaForm.value;
      const roupa = new Roupa(this.data?.id, formObj.nome, formObj.valor, undefined, formObj.prazo);

      if (this.data?.id) {
        this.roupaService.alterar(roupa).subscribe(
          () => {
            this.toastr.success('Roupa atualizada com sucesso!');
            this.dialogRef.close();
          },
          (error) => {
            this.toastr.error('Erro ao atualizar a roupa.');
          }
        );
      } else {
        this.roupaService.inserirRoupa(roupa).subscribe(
          () => {
            this.toastr.success('Roupa criada com sucesso!');
            this.dialogRef.close();
          },
          (error) => {
            this.toastr.error('Erro ao criar a roupa.');

          }
        );
      }
    } else {
      this.toastr.info('Nenhuma alteração foi feita!');
    }
  }

  get nome() { return this.roupaForm.get('nome'); }
  get valor() { return this.roupaForm.get('valor'); }
  get prazo() { return this.roupaForm.get('prazo'); }

  closeModal() {
    this.dialogRef.close();
  }
}
