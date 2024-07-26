import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authenticationservice/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isEmployee: boolean = false;

  constructor(private authService: AuthenticationService) { }

  logout(): void {
    this.authService.logout();
  }
}
