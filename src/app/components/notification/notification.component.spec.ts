import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Notification from 'src/app/models/Notification';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let mockNotification: Notification;
  let button: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularMaterialModule, BrowserAnimationsModule],
      declarations: [NotificationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

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
        followedByCurrentUser: false,
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
        followedByCurrentUser: false,
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
          followedByCurrentUser: false,
        },
        comments: [],
        postType: 'Comment',
        likeCount: 0,
      },
      type: 'LIKE',
      status: 'UNREAD',
      message: ' has liked your post!',
    };

    component.notification = mockNotification;
    button = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message', () => {
    const message = fixture.nativeElement.querySelector('a').textContent;
    expect(message).toEqual(
      `${mockNotification.sender.userName}${mockNotification.message}`
    );
  });

  it('should emit the notification on the onRead output', () => {
    component.notification = mockNotification;
    spyOn(component.onRead, 'emit');
    component.handleRead();
    expect(component.onRead.emit).toHaveBeenCalledWith(mockNotification);
  });

  it('should emit the notification on handleDelete', () => {
    component.notification = mockNotification;
    spyOn(component.handleClick, 'emit');
    component.handleDelete();
    expect(component.handleClick.emit).toHaveBeenCalledWith(mockNotification);
  });

  it('should have a delete button', () => {
    expect(button).toBeTruthy();
  });

  it('should call handleDelete when delete button is clicked', () => {
    spyOn(component, 'handleDelete');
    button.triggerEventHandler('click', null);
    expect(component.handleDelete).toHaveBeenCalled();
  });

  it('should call handleRead when mat-item is clicked', () => {
    let item = fixture.debugElement.query(By.css('mat-list-item'));
    spyOn(component, 'handleRead');
    fixture.detectChanges();
    item.triggerEventHandler('click', null);
    expect(component.handleRead).toHaveBeenCalled();
  });
});
