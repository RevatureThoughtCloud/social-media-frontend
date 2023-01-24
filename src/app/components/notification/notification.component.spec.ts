import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Notification from 'src/app/models/Notification';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let mockNotification: Notification;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[AngularMaterialModule, BrowserAnimationsModule],
      declarations: [ NotificationComponent ],
      schemas: [NO_ERRORS_SCHEMA]      
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    mockNotification = {
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
    }

    component.notification = mockNotification;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message', () => {
    const message = fixture.nativeElement.querySelector('a').textContent;
    expect(message).toEqual(`${mockNotification.sender.userName}${mockNotification.message}`)
  })

});
