import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

const PROTOCOL = 'http';
const PORT = 8080;

@Injectable({
  providedIn: 'root',
})
export class FollowsService {
  baseUrl: string; //location of our Rest API
  headers: any;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}`;

    this.headers = {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    };
  }

  //a
  currentUserFollow(followUserName: string): Observable<any> {
    return this.http
      .post<any>(
        this.baseUrl + '/user/follow/' + followUserName,
        {},
        {
          headers: environment.headers,
          withCredentials: environment.withCredentials,
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  //a
  currentUserUnFollow(unfollowUserName: string): Observable<void> {
    return this.http
      .delete<void>(
        this.baseUrl + '/user/unfollow/' + unfollowUserName,

        {
          headers: {
            ...environment.headers,
          },
          withCredentials: environment.withCredentials,
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  //a
  getUsersFollowers(username: string): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseUrl + '/user/' + username + '/followers', {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  //a
  getUsersFollowings(username: string): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseUrl + '/user/' + username + '/followings', {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  //Throw error for any http request failures
  private handleError(res: HttpErrorResponse | any) {
    return throwError(() => new Error('Error in follow service'));
  }
}
