import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { FollowStatusComponent } from '../follow-status/follow-status.component';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let postService: PostService;

  beforeEach(waitForAsync(() => {
    postService = jasmine.createSpyObj('PostService', ['getPostsByAuthor']);
    const route = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);
    route.paramMap = of({ get: () => 1 });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UserProfileComponent, FollowStatusComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PostService, useValue: postService },
        { provide: ActivatedRoute, useValue: route },
        provideMockStore({}),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
