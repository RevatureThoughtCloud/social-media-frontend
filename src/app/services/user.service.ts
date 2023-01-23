import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import User from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.userUrl}/${id}`, {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  getUserBySearchText(searchText: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.userUrl}` + '/search/' + `${searchText}`,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
}
