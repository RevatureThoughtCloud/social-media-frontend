import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import Notification from '../models/Notification';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NotificationService);
  });

  it('should get notification count', fakeAsync(() => {
    const mockCount = 3;

    const httpGetSpy = spyOn(httpClient, 'get').and.returnValue(of(mockCount));

    service.getNotificationCount();
    tick();

    expect(httpGetSpy).toHaveBeenCalledWith(
      `${environment.baseUrl}/notifications/count`,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );

    expect(service.count).toEqual(mockCount);
  }));

  it('should get notifications', fakeAsync(() => {
    const mocknotifications: Notification[] = [
      {
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
      },
    ];

    const httpGetSpy = spyOn(httpClient, 'get').and.returnValue(
      of(mocknotifications)
    );

    service.getNotifications();
    tick();

    expect(httpGetSpy).toHaveBeenCalledWith(
      `${environment.baseUrl}/notifications`,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );

    expect(service.notifications).toEqual(mocknotifications);
  }));

  it('should mark status as read', fakeAsync(() => {
    const mocknotification: Notification = {
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
    const httpGetSpy = spyOn(httpClient, 'put').and.returnValue(of(true));

    service.markRead(mocknotification);
    tick();

    expect(httpGetSpy).toHaveBeenCalledWith(
      `${environment.baseUrl}/notifications/${mocknotification.id}`,
      null,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }));

  it('should delete', fakeAsync(() => {
    const mocknotification: Notification = {
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
    const httpGetSpy = spyOn(httpClient, 'delete').and.returnValue(of(true));

    service.deleteNotification(mocknotification.id);
    tick();

    expect(httpGetSpy).toHaveBeenCalledWith(
      `${environment.baseUrl}/notifications/${mocknotification.id}`,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
