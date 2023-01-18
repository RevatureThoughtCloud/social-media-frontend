import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  private _menuOpen:boolean = false;

  constructor(private authService: AuthService, private notiService: NotificationService, private router: Router) { }

  ngOnInit(): void { this.notiService.getNotificationCount(); }

  ngOnDestroy() { }

  /* ****** notification menu stuff ****** */

  get count(): number{
    return this.notiService.count;
  }

  get menuOpen(){
    return this._menuOpen;
  }

  toggleNotes():void {
    this._menuOpen = !this._menuOpen;
  }

  /* ******************************** */

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
