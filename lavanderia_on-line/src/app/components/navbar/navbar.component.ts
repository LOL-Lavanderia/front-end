import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authenticationservice/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isEmployee: boolean = true;

  constructor(private authService: AuthenticationService) { }
  ngOnInit(): void {
    if(this.authService.usuarioLogado.role.role === "client"){
      this.isEmployee = false;
    };
  }

  logout(): void {
    this.authService.logout();
  }
}
