import { Component } from '@angular/core';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})

export class RelatoriosComponent { implements OnInit {
  constructor(private titleService: TitleService) {}
  ngOnInit(): void {
      this.titleService.setTitle('Relatorios');
  }
}
