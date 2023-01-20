import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ChangeTheme } from 'src/app/store/actions/user-preferences.actions';
import { PreferencesState } from 'src/app/store/reducers/user-preferences.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private _menuOpen: boolean = false;
  public preferences$: Observable<PreferencesState>;
  constructor(
    private authService: AuthService,
    private notiService: NotificationService,
    private router: Router,
    private store: Store<{ preferences: PreferencesState }>
  ) {
    this.preferences$ = store.select('preferences');
  }

  ngOnInit(): void {
    this.notiService.getNotificationCount();
  }

  ngOnDestroy() {}

  /* ****** notification menu stuff ****** */

  get count(): number {
    return this.notiService.count;
  }

  get menuOpen() {
    return this._menuOpen;
  }

  toggleNotes(): void {
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
    this.store.dispatch(new ChangeTheme(''));
  }
}
