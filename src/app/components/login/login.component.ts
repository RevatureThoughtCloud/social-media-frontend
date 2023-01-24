import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Login } from 'src/app/store/actions/auth.actions';
import {
  GetFollowers,
  GetFollowings,
} from 'src/app/store/actions/user-data.actions';
import { AuthOnlyState } from 'src/app/store/app.state';
import { AuthState } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  auth$: Observable<AuthState>;
  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.auth$.subscribe((res: AuthState) => {
      if (res && res.loggedIn) {
        this.router.navigate(['personalized-feed']);
        this.notificationService.getNotificationCount();
      }
    });
  }

  onSubmit(e: any): void {
    e.preventDefault();

    this.store.dispatch(
      new Login(
        this.loginForm.value.email || '',
        this.loginForm.value.password || ''
      )
    );
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
