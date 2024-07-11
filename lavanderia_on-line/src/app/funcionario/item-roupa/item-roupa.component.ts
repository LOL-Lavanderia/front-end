import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roupa } from '../../shared/models';
import { RoupaService } from '../../shared/services/roupa.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRoupaComponent } from './modal-roupa/modal-roupa/modal-roupa.component';

@Component({
  selector: 'app-item-roupa',
  templateUrl: './item-roupa.component.html',
  styleUrl: './item-roupa.component.css',
})
export class ItemRoupaComponent implements OnInit {

  roupas: Roupa[] = [];
  displayedColumns: string[] = ['id', 'name', 'time', 'price', 'actions'];

  constructor(
     private router: Router, 
     private roupaService: RoupaService,private dialog: MatDialog,) { }
  
     ngOnInit(): void {
      this.carregarRoupas();
    }

    carregarRoupas(): void {
      this.roupaService.listarRoupas().pipe().subscribe((data) => {
        this.roupas = data;
      }, error => {
        console.error('Erro ao buscar roupas', error);
      });
    } 
     
  returnHomePage(): void {
    this.router.navigate(['/admin_homepage'])
  }

  openNewRoupaModal(): void {
    this.openRoupaModal(new Roupa(undefined, '', undefined, undefined, undefined));
  }

  openRoupaModal(roupa: Roupa): void {
    const dialogRef = this.dialog.open(ModalRoupaComponent, {
      data: roupa
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // Verificar se há resultado ou mudanças significativas
      if (result) {
        this.carregarRoupas();
      }
    });
  }

  deleteRoupa(roupa: Roupa): void {
      this.roupaService.removerRoupa(roupa.id!).subscribe(() => {
      this.roupas = this.roupas.filter(r => r.id !== roupa.id!);
    });
  }
}
