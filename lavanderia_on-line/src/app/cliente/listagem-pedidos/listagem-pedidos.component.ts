import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrl: './listagem-pedidos.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon,
    CommonModule
  ]
})
export class ListagemPedidosComponent {

}
