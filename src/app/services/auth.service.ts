import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import { LoginSuccess, LogoutSuccess } from '../store/actions/auth.actions';
import { AuthState } from '../store/reducers/auth.reducer';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User = new User(0, '', '', '', '');
  auth$: Observable<AuthState>;
  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>
  ) {
    this.auth$ = store.select('auth');
    this.auth$.subscribe((res) => {
      if(res==undefined){return;}
      if(res.user !=undefined){
        this.currentUser = res.user ?? new User(0, '', '', '', '');
      }

    });
  }

  login(email: string, password: string): Observable<User> {
    const payload = { email: email, password: password };
    return this.http.post<any>(`${this.authUrl}/login`, payload, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  resetPassTokenRequest(userEmail: string): Observable<any> {
    return this.http.post<any>(
      `${this.authUrl}/reset-password`,
      { userEmail },
      {
        headers: environment.headers,
      }
    );
  }

  resetPass(newPassword: string, token: string): Observable<any> {
    return this.http.post<any>(
      `${this.authUrl}/reset-password`,
      { newPassword },
      {
        headers: environment.headers,
        params: { token: token },
      }
    );
  }

  isLoggedIn(): boolean {
    if (this.currentUser && this.currentUser.id !== 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    //this.currentUser = new User(0, '', '', '', '');
    // this.store.dispatch(new LogoutSuccess());
    this.http.post(`${this.authUrl}/logout`, null);
    this.currentUser = new User(0, '', '', '', '');
    this.store.dispatch(new LogoutSuccess());
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userName: string
  ): Observable<any> {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userName: userName,
    };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {
      headers: environment.headers,
    });
  }
}
