import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PostComponent } from './post.component';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { FormGroup, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { UserCardComponent } from '../user-card/user-card.component';
import Like from 'src/app/models/Like';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: PostService;
  let authService: AuthService;
  let post: Post;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PostComponent, UserCardComponent],
      providers: [AuthService, PostService, provideMockStore({})],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    authService = TestBed.inject(AuthService);
    const user = new User(
      1,
      'test@email.com',
      'firstName',
      'lastName',
      'test user',
      0,
      0
    );
    component.post = new Post(1, 'test post', 'test content', user, [], 'Post');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle replyToPost', () => {
    component.toggleReplyToPost();
    expect(component.replyToPost).toBeTruthy();
    component.toggleReplyToPost();
    expect(component.replyToPost).toBeFalsy();
  });

  it('should delete post', () => {
    const spy = spyOn(component.handleDeletePost, 'emit');
    component.handleDelete();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should toggle edit post', () => {
    component.toggleEdit();
    expect(component.editPost).toBeTruthy();
    component.toggleEdit();
    expect(component.editPost).toBeFalsy();
  });

  it('should handle edit post', () => {
    component.editForm = new FormGroup({
      text: new FormControl('Edited test post'),
    });
    component.handleEdit();
    expect(component.post.text).toEqual('Edited test post');
    expect(component.editPost).toBeFalsy();
  });

  it('should update for new comment', () => {
    component.post.comments.push(
      new Post(2, 'Test comment', '', authService.currentUser, [], 'Comment')
    );
    const newComment = new Post(
      2,
      'Edited test comment',
      '',
      authService.currentUser,
      [],
      'Comment'
    );
    component.updateForNewComment(newComment);
    expect(component.post.comments[0].text).toEqual('Edited test comment');
  });

  it ('should update the like count on like', () => {
    spyOn(postService, "postLike").and.returnValue(of(new Like(component.post, authService.currentUser)));
    spyOn(postService, "postById").and.returnValue(of(new Post(0, '', '', authService.currentUser, [], '', 1 )));

    const element = document.createElement("i");

    component.handleClick(element);
    expect(component.post.likeCount).toBe(1);
  });

  it ('should update the like count on dislike', () => {
    spyOn(postService, "deleteLike").and.returnValue(of(true));
    spyOn(postService, "postById").and.returnValue(of(new Post(0, '', '', authService.currentUser, [], '', -1 )));

    const element = document.createElement("i");
    component.userLikedPost = true;

    component.handleClick(element);
    expect(component.post.likeCount).toBe(-1);
  });
});
