import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

import { PersonalizedFeedComponent } from './personalized-feed.component';
/*
describe('PersonalizedFeedComponent', () => {
  let component: PersonalizedFeedComponent;
  let fixture: ComponentFixture<PersonalizedFeedComponent>;
  let store: MockStore<{}>;
  let authService: AuthService;
  let postService: PostService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormGroup, FormControl],
      declarations: [PersonalizedFeedComponent],
      providers: [
        { provide: PostService, useValue: PostService },
        { provide: AuthService, useValue: AuthService },
        { provide: Store, useValue: provideMockStore({}) },
      ],
    }).compileComponents();
  }));
  (store = TestBed.get<Store>(Store)), (authService = TestBed.get(AuthService));
  postService = TestBed.get(PostService);
  fixture = TestBed.createComponent(PersonalizedFeedComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
