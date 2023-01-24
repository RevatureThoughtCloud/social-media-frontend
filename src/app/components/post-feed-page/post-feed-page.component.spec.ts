import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { PostFeedPageComponent } from './post-feed-page.component';

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let postService: PostService;
  let authService: AuthService;
  let testPost = new Post(0, '', '', new User(0, '', '', '', ''), [], '');

  beforeEach(async () => {
    let postSpy = jasmine.createSpyObj('PostService', {
      'getAllTopPosts': of([]),
      'upsertPost': of(testPost),
      'deletePost': of(void 0)
    });
    let authSpy = jasmine.createSpy('AuthService')
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, AngularMaterialModule, BrowserAnimationsModule],
      declarations: [PostFeedPageComponent],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [{provide: AuthService, useValue: authSpy}, 
                  {provide: PostService, useValue: postSpy},
                  provideMockStore({})],
    }).compileComponents();

    postService = TestBed.inject(PostService);
    authService = TestBed.inject(AuthService);
    component = new PostFeedPageComponent(postService, authService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate posts on init', () => {
    component.ngOnInit();
    expect(component.posts).toBeTruthy();
  });

  it('should add the new post to the top when calling submitPost', () => {
    let event = new MouseEvent('click');
    component.posts = [new Post(0, 'not this one', '', new User(0, '', '', '', ''), [], '')];
    component.submitPost(event);
    expect(component.posts[0]).toEqual(testPost);
  });

  it('should delete the post from the feed when calling deletePost', () => {
    spyOn(window, "confirm").and.returnValue(true);
    let survivingPost = new Post(1, 'not this one', '', new User(0, '', '', '', ''), [], '');
    let livingPost = new Post(3, 'not this one either', '', new User(0, '', '', '', ''), [], '');
    component.posts = [survivingPost, testPost, livingPost];
    component.deletePost(0);
    expect(component.posts).toEqual([survivingPost, livingPost])
  });
});
