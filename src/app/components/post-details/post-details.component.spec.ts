import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { PostDetailsComponent } from './post-details.component';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let post: Post;

  beforeEach(waitForAsync(() => {
    const user = new User(
      1,
      'test@email.com',
      'firstName',
      'lastName',
      'test user',
      0,
      0
    );
    post = new Post(1, 'test post', 'test content', user, [], 'Post');
    TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PostService, useValue: { postById: () => of(post) } },
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: { navigate: () => { } } },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => 1 }) },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
