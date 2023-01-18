import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PostComponent } from './post.component';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: PostService;
  let authService: AuthService;
  let post: Post;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostComponent],
      providers: [AuthService, PostService, provideMockStore({})]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    authService = TestBed.inject(AuthService);
    const user = new User(1, 'test@email.com', 'firstName', 'lastName', 'test user', 0, 0);
    post = new Post(1, "test post", "test content", user, [], "Post");
    component.post = post;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  })