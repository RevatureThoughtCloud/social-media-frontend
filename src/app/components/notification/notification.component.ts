import { Component, EventEmitter, Input, Output } from '@angular/core';
import Notification from 'src/app/models/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {


  constructor(){}

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
