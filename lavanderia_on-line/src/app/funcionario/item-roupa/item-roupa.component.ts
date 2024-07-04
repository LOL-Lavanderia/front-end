import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../shared/models/item/item.model';
import { ItemService } from '../../shared/services/itemservice/item.service';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Roupa } from '../../shared/models';
import { RoupaService } from '../../shared/services/roupa.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal/modal.component';

@Component({
  selector: 'app-item-roupa',
  standalone: true,
  templateUrl: './item-roupa.component.html',
  styleUrl: './item-roupa.component.css',
  imports: [
    MatTableModule,
    MatIcon,
    CommonModule
  ]
})
export class ItemRoupaComponent {

  roupas: Roupa[] = [];
  displayedColumns: string[] = ['id', 'name', 'term', 'price', 'actions'];

  constructor(private router: Router, private roupaService: RoupaService, private dialog: MatDialog,) { }

  returnHomePage(): void {
    this.router.navigate(['/admin_homepage'])
  }

  excluirRoupa(id: number): void {
    this.roupaService.removerRoupa(id).subscribe(() => {
      this.roupas = this.roupas.filter(roupa => roupa.id !== id);
    }, error => {
      console.error(`Error when trying to delete item with id ${id}`, error);
    });
  }

  ngOnInit(): void {
    if (this.roupas) {
      this.roupaService.listarRoupas().subscribe(data => {
        this.roupas = data;
      }, error => {
        console.error('Erro ao buscar roupas', error);
      });
    } else {
      console.warn('Usuário não está logado');
    }

    
  }

  atualizarRoupa(roupaId: number): void {
    this.roupaService.buscarPorId(roupaId).subscribe((roupa) => {
      console.log('Abrindo modal para atualizar', roupa);
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '250px',
        data: { roupa, operacao: 'atualizar' }
      });
      console.log('Abrindo modal para atualizar', roupa);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.roupaService.alterar(result).subscribe(() => {
            console.log('Roupa atualizada com sucesso!');
            this.roupaService.listarRoupas(); // Recarrega a lista após a atualização
          }, error => {
            console.error('Erro ao atualizar a roupa:', error);
          });
        }
      });
    });
  }
}

