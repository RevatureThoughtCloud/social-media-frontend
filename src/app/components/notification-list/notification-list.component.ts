import { Component, OnInit } from '@angular/core';
import Notification from 'src/app/models/Notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit{


  constructor(private notiService: NotificationService){}

  get notifications() {
    return this.notiService.notifications;
  }

  ngOnInit(): void {
    this.notiService.getNotifications();
  }

  delete(notification: Notification){
    this.notiService.deleteNotification(notification.id);
  }

  read(notification: Notification) {
    this.notiService.markRead(notification);
  }



}
