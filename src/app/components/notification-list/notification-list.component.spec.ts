import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import Notification from 'src/app/models/Notification';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserCardComponent } from '../user-card/user-card.component';

import { NotificationListComponent } from './notification-list.component';

describe('NotificationListComponent', () => {
  let component: NotificationListComponent;
  let fixture: ComponentFixture<NotificationListComponent>;
  let service: NotificationService;
  let notification: Notification;

  beforeEach(async () => {
    notification = {
      id: 1,
      recipient: {
        id: 1,
        email: 'bob@bob.com',
        firstName: 'bob',
        lastName: 'loblaw',
        userName: 'bobloblaw',
        aboutMe: 'About Me',
        followersCount: 0,
        followingsCount: 0,
        followedByCurrentUser: false
      },
      sender: {
        id: 1,
        email: 'bob@bob.com',
        firstName: 'bob',
        lastName: 'loblaw',
        userName: 'bobloblaw',
        aboutMe: 'About Me',
        followersCount: 0,
        followingsCount: 0,
        followedByCurrentUser: false
      },
      post: {
        id: 1,
        text: 'something or another',
        imageUrl: '',
        author: {
          id: 1,
          email: 'bob@bob.com',
          firstName: 'bob',
          lastName: 'loblaw',
          userName: 'bobloblaw',
          aboutMe: 'About Me',
          followersCount: 0,
          followingsCount: 0,
          followedByCurrentUser: false
        },
        comments: [],
        postType: 'Comment',
        likeCount: 0,
      },
      type: 'LIKE',
      status: 'UNREAD',
      message: ' has liked your post!',
    };

    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, AngularMaterialModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ NotificationListComponent ],
      providers: [NotificationService, {
        provide: AuthService,
        useValue: { currentUser: { userName: 'testUser' } },
      },
      provideMockStore({}),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call deleteNotification on the notification service with the correct id', () => {
    spyOn(service, 'deleteNotification');
    component.delete(notification);
    expect(service.deleteNotification).toHaveBeenCalledWith(1);
    
  })

  it('should call markRead from notification service', ()=> {
    spyOn(service, 'markRead');
    component.read(notification);
    expect(service.markRead).toHaveBeenCalledWith(notification);
  })





});



