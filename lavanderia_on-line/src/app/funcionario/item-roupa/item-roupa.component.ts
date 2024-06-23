import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../shared/models/item/item.model';
import { ItemService } from '../../shared/services/itemservice/item.service';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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

  itens: Item[] = [];
  displayedColumns: string[] = ['id', 'name', 'term', 'amount', 'actions'];

  constructor(private router: Router, private itemService: ItemService) { }

  returnHomePage(): void {
    this.router.navigate(['/admin_homepage'])
  }

  novoItem(): void {
    this.router.navigate(['/inserir_item']); // 3. Use o método navigate
  }

  excluirItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.itens = this.itens.filter(item => item.id !== id);
    }, error => {
      console.error(`Error when trying to delete item with id ${id}`, error);
    });
  }


  ngOnInit(): void {
    if (this.itens) {
      this.itemService.listAll().subscribe(data => {
        this.itens = data;
      }, error => {
        // Você pode adicionar tratamento de erro aqui
        console.error('Erro ao buscar itens', error);
      });
    } else {
      // Lidar com erro - usuário não logado
      console.warn('Usuário não está logado');
    }
  }

  goToUpdatePage(itemId: number): void {
    // Navigates to the update item page with the item ID
    this.router.navigate(['/atualizar-item', itemId]);
  }
}
