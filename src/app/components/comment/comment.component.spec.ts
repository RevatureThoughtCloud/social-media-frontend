import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { authReducer } from 'src/app/store/reducers/auth.reducer';
import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let authService: AuthService;
  let postService: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ auth: authReducer }),
        ReactiveFormsModule,
      ],
      providers: [PostService, AuthService, provideMockStore({})],
      declarations: [CommentComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    authService = TestBed.inject(AuthService);
    const author = new User(
      1,
      'test@email.com',
      'firstName',
      'lastName',
      'test user',
      0,
      0
    );
    const comment = new Post(
      1,
      'This is a comment',
      '',
      author,
      [],
      'Comment',
      0
    );
    component.inputComment = comment;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
