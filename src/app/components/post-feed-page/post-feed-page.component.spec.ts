import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { PostFeedPageComponent } from './post-feed-page.component';

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let fixture: ComponentFixture<PostFeedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, AngularMaterialModule, BrowserAnimationsModule],
      declarations: [PostFeedPageComponent],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [AuthService, PostService, provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(PostFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
