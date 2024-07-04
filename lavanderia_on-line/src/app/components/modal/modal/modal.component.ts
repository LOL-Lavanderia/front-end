import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roupa } from '../../../shared/models'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  form!: FormGroup;
  @Input() roupa!: Roupa | null; // Permite que seja nulo para criação de nova roupa
  @Input() operacao!: 'criar' | 'atualizar'; // Determina se é para criar ou atualizar
  @Output() updateConfirmed = new EventEmitter<Roupa>();

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.roupa, this.operacao); // Isso irá imprimir os valores recebidos pela modal

    this.form = this.fb.group({
      nome: [this.roupa ? this.roupa.name : '', Validators.required],
      valor: [this.roupa ? this.roupa.price : '', Validators.required],
      prazo: [this.roupa ? this.roupa.time : '', Validators.required]
      // Adicione outros campos conforme necessário
    });
  }

  onSave(): void {
    const novaOuAtualizadaRoupa: Roupa = {
      ...(this.roupa || {}), // Preserva o objeto roupa existente ou cria um novo
      name: this.form.controls['nome'].value,
      price: this.form.controls['valor'].value,
      time: this.form.controls['prazo'].value
      // Atualize os demais campos conforme necessário
    };

    this.updateConfirmed.emit(novaOuAtualizadaRoupa); // Emite a roupa para o componente pai
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}