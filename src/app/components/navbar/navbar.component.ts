import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Notification from 'src/app/models/Notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import {
  ChangeTheme,
  ToggleSidebar,
} from 'src/app/store/actions/user-preferences.actions';
import { AuthOnlyState } from 'src/app/store/app.state';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { PreferencesState } from 'src/app/store/reducers/user-preferences.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private _menuOpen: boolean = false;
  public preferences$: Observable<PreferencesState>;
  public auth$: Observable<AuthState>;
  public isExpanded: boolean = false;
  public notes$: Observable<Notification[]>;

  constructor(
    private notiService: NotificationService,
    private router: Router,
    private store: Store<{ preferences: PreferencesState; auth: AuthState }>
  ) {
    this.preferences$ = store.select('preferences');
    this.auth$ = store.select('auth');
  }

  ngOnInit(): void {
    this.notiService.getNotificationCount();
    this.notes$ = this.notiService.getNotificationsLimit5();
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
    //refresh list when click meny button
    this.notes$ = this.notiService.getNotificationsLimit5();
    this._menuOpen = !this._menuOpen;
  }

  expandSideNav(): void {
    this.store.dispatch(new ToggleSidebar());
  }

  /* ******************************** */

  goToLogin() {
    this.router.navigate(['login']);
  }

  toggleTheme() {
    this.store.dispatch(new ChangeTheme(''));
  }
}
