import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RoupaService } from '../../shared/services/roupa.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isEmployee: boolean = true;
  isItemRoupa = false;


  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private roupaService: RoupaService) {}
  
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isItemRoupa = this.router.url === '/item-roupa';
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { roupa: null, operacao: 'criar' }
    });
    console.log('Abrindo modal para criar roupa', );
      dialogRef.componentInstance.updateConfirmed.subscribe(result => {
        if (result) {
          this.roupaService.inserirRoupa(result).subscribe(() => {
            console.log('Roupa criada com sucesso!');
            this.roupaService.listarRoupas(); // Recarrega a lista após a atualização
          }, error => {
            console.error('Erro ao criar a roupa:', error);
          });
        }
      });
  }
}
