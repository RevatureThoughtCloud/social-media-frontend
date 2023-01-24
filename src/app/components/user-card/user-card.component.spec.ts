import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let authService: AuthService;


  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, AngularMaterialModule, BrowserAnimationsModule],
      declarations: [UserCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AuthService,
          useValue: { currentUser: { id:1, userName: 'testUser' }, },
        },
        provideMockStore({})

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user to be equal to the current user from the auth service', () => {
    expect(component.user).toEqual(authService.currentUser);
  });


});
