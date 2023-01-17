import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  ngOnDestroy() { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  toggleTheme() {
    if (
      document.getElementById('root')?.getAttribute('class') ===
      'darkMode mat-app-background root'
    ) {
      document
        .getElementById('root')
        ?.setAttribute('class', 'mat-app-background root');
    } else {
      document
        .getElementById('root')
        ?.setAttribute('class', 'darkMode mat-app-background root');
    }
  }
}
