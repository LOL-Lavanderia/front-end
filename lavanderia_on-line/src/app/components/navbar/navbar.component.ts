import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isEmployee: boolean = true;
  isItemRoupa = false;


  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {}
  
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
  }
}
