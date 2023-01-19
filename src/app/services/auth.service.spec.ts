import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { environment } from "src/environments/environment";
import User from "../models/User";
import { LoginSuccess } from "../store/actions/auth.actions";
import { authReducer } from "../store/reducers/auth.reducer";
import { AuthService } from "./auth.service";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
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
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // login() Unit Tests
  it('should login a user', () => {
    const payload = { email: 'email@example.com', password: 'password' };
    const user = new User(
      1,
      'email@example.com',
      'firstname',
      'lastname',
      'username'
    );
    const loginSuccess = new LoginSuccess(user);
    service.login(payload.email, payload.password).subscribe((res) => {
      expect(res).toEqual(loginSuccess);
    });
  });

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
    service.logout();
    expect(service.currentUser).toEqual(new User(0, '', '', '', ''));
    const req = httpMock.expectOne(`${environment.baseUrl}/auth/logout`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });
});
