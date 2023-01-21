import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Logout2 } from 'src/app/store/reducer.module';
import { AuthState } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'info-popover',
  templateUrl: './user-info-popover.component.html',
  styleUrls: ['./user-info-popover.component.css'],
})
export class UserInfoPopoverComponent {
  auth$: Observable<AuthState>;
  constructor(private store: Store<{ auth: AuthState }>) {
    this.auth$ = store.select('auth');
  }

  logout() {
    this.store.dispatch(new Logout2());
  }
}
