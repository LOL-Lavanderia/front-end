import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roupa } from '../../../shared/models'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  form!: FormGroup;
  // @Input() roupa!: Roupa | null; // Permite que seja nulo para criação de nova roupa
  // @Input() operacao!: 'criar' | 'atualizar'; // Determina se é para criar ou atualizar
  @Output() updateConfirmed = new EventEmitter<Roupa>();

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {roupa: Roupa | null, operacao :string}
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: [this.data.roupa ? this.data.roupa.name : '', Validators.required],
      valor: [this.data.roupa ? this.data.roupa.price : '', Validators.required],
      prazo: [this.data.roupa ? this.data.roupa.time : '', Validators.required]
      // Adicione outros campos conforme necessário
    });
  }

  onSave(): void {
    const novaOuAtualizadaRoupa: Roupa = {
      ...(this.data.roupa || {}), // Preserva o objeto roupa existente ou cria um novo,
      name: this.form.controls['nome'].value,
      price: this.form.controls['valor'].value,
      time: this.form.controls['prazo'].value

    };

    this.updateConfirmed.emit(novaOuAtualizadaRoupa); // Emite a roupa para o componente pai
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}