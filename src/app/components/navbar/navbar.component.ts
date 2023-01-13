import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @HostBinding('class') className = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  logout() {
    this.authService.logout();
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
