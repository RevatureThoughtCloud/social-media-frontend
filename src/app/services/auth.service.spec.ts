import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import User from '../models/User';
import { LoginSuccess, LogoutSuccess } from '../store/actions/auth.actions';
import { authReducer } from '../store/reducers/auth.reducer';
import { AuthService } from './auth.service';

// This test file tests the AuthService which is responsible for handling all authentication-related logic
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let store: Store;

  // Configure the test environment before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', authReducer),
      ],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Test that the auth service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // login() Unit Test
  it('should login a user', fakeAsync(() => {
    const payload = { email: 'email@example.com', password: 'password' };
    const user = new User(
      1,
      'email@example.com',
      'firstname',
      'lastname',
      'username'
    );
    const spy = spyOn(service, 'login').and.returnValue(of(user));

    service.login(payload.email, payload.password).subscribe(res => {
      expect(res).toEqual(user);
    });
    tick()
    expect(spy).toHaveBeenCalledWith(payload.email, payload.password);
    
  }));

  // isLoggedIn() Unit Tests
  it('should return true for isLoggedIn() when user is logged in', () => {
    service.currentUser = new User(
      1,
      'test@email.com',
      'Test',
      'User',
      'testuser'
    );
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false for isLoggedIn() when user is not logged in', () => {
    service.currentUser = new User(0, '', '', '', '');
    expect(service.isLoggedIn()).toBeFalsy();
  });

  // logout() Unit Test
  it('should logout user successfully', () => {
    service.currentUser = new User(
      1,
      'test@email.com',
      'Test',
      'User',
      'testuser'
    );

    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    service.logout();
    expect(service.currentUser).toEqual(new User(0, '', '', '', ''));
    expect(storeSpy).toHaveBeenCalledWith(new LogoutSuccess());
  });
});
