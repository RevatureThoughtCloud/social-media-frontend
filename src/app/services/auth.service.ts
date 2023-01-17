import { ContentObserver } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import { LoginSuccess } from '../store/actions/auth.actions';
import { AuthState } from '../store/reducers/auth.reducer';

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
      this.currentUser = res.user ?? new User(0, '', '', '', '');
      console.log(res.user);
    });
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email: email, password: password };
    const res = this.http
      .post<any>(`${this.authUrl}/login`, payload, {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      })
      .pipe(
        map((data: User) => {
          this.currentUser = data;
          this.store.dispatch(new LoginSuccess(data));
        })
      );

    return res;
  }

  isLoggedIn(): boolean {
    if (this.currentUser && this.currentUser.id !== 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null).subscribe();
    this.currentUser = new User(0, '', '', '', '');
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
      username: userName,
    };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {
      headers: environment.headers,
    });
  }
}
