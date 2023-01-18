import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import Notification from 'src/app/models/Notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {


  constructor(private notiService: NotificationService){}

  @Input() notification: Notification;

  @Output() handleClick = new EventEmitter<Notification>();

  @Output() onRead = new EventEmitter<Notification>();

  handleRead(){
    this.onRead.emit(this.notification);
  }

  handleDelete(){
    this.handleClick.emit(this.notification);
  }


}
