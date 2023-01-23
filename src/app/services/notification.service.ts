import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Notification from '../models/Notification';

const { baseUrl, withCredentials, headers } = environment;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  //private url = environment.baseUrl + "/notifications";
  //private headers = environment.headers;
  //private withCredentials = environment.withCredentials;
  private url = baseUrl + '/notifications';
  private _count = 0;
  private _notifications: Notification[] = [];

  constructor(private http: HttpClient) {}

  get count() {
    return this._count;
  }

  get notifications() {
    return this._notifications;
  }

  getNotificationCount() {
    this.http
      .get<number>(this.url + '/count', {
        headers: headers,
        withCredentials: withCredentials,
      })
      .subscribe((res) => (this._count = res));
  }

  getNotifications() {
    this.http
      .get<Notification[]>(this.url, {
        headers: headers,
        withCredentials: withCredentials,
      })
      .subscribe((res) => (this._notifications = res));
  }

  getNotificationsLimit5(): Observable<Notification[]>{
    return this.http
    .get<Notification[]>(this.url+"/nav", {
      headers: headers,
      withCredentials: withCredentials,
    })
  }

  markRead(notification: Notification) {
    this.http
      .put<boolean>(this.url + '/' + notification.id, null, {
        headers: headers,
        withCredentials: withCredentials,
      })
      .subscribe((bool) => {
        if (bool) {
          this.getNotifications();
          this.getNotificationCount();
        }
      });
  }

  deleteNotification(id: number) {
    this.http
      .delete(this.url + '/' + id, {
        headers: headers,
        withCredentials: withCredentials,
      })
      .subscribe(() => {
        this.getNotifications();
        this.getNotificationCount();
      });
  }
}
