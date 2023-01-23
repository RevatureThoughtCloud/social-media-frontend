import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/store/actions/auth.actions';
import {
  GetFollowers,
  GetFollowings,
} from 'src/app/store/actions/user-data.actions';
import { AuthOnlyState } from 'src/app/store/app.state';
import { AuthState } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  email = new FormControl('');
  newPassword = new FormControl('');
  token: string = '';
  hasToken: boolean = false;

  auth$: Observable<AuthState>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private authService: AuthService
  ) {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.auth$.subscribe((res: AuthState) => {
      if (res.loggedIn) {
        this.router.navigate(['post-feed']);
      }
    });
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      this.hasToken = this.token?.length > 0;
    });
  }

  onSubmit(e: any): void {
    e.preventDefault();
    if (this.hasToken) {
      this.authService
        .resetPass(this.email.value || '', this.token)
        .subscribe((res) => this.router.navigate(['post-feed']));
    } else {
      this.authService
        .resetPassTokenRequest(this.email.value || '')
        .subscribe((res) => this.router.navigate(['login']));
    }
  }
}
