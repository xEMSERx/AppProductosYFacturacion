import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isAdmin = localStorage.getItem('role') === 'admin';
  showAdminInput = false;
  adminPassword = '';
  adminError = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  loginAsAdmin() {
    if (this.adminPassword === 'admin123') {
      this.isAdmin = true;
      localStorage.setItem('role', 'admin');
      this.showAdminInput = false;
      this.adminPassword = '';
      this.adminError = '';
    } else {
      this.adminError = 'Contraseña incorrecta';
    }
  }

  logoutAdmin() {
    this.isAdmin = false;
    localStorage.removeItem('role');
  }
}