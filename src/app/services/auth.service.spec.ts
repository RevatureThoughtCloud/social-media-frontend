import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import User from '../models/User';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  // Configure the test environment before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Verify that there are no outstanding requests after each test
  afterEach(() => {
    httpMock.verify();
  });

  // Test that the auth service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // login() Unit Test
  it('should login user successfully', () => {
    // Test data
    const email = 'test@email.com';
    const password = 'password';
    const mockResponse = {
      id: 1,
      email: email,
      firstName: 'Test',
      lastName: 'User',
      userName: 'testuser'
    };

    // Subscribe to the service method and assert that the returned data is correct
    service.login(email, password).subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(service.currentUser).toEqual(new User(mockResponse.id, mockResponse.email, mockResponse.firstName, mockResponse.lastName, mockResponse.userName));
    });

    // Expect a POST request to the auth/login endpoint and flush the test data
    const req = httpMock.match(`${environment.baseUrl}/auth/login`)[0];
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // isLoggedIn() Unit Tests 
  it('should return true for isLoggedIn() when user is logged in', () => {
    service.currentUser = new User(1, 'test@email.com', 'Test', 'User', 'testuser');
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false for isLoggedIn() when user is not logged in', () => {
    service.currentUser = new User(0, '', '', '', '');
    expect(service.isLoggedIn()).toBeFalsy();
  });

  // logout() Unit Test 
  it('should logout user successfully', () => {
    service.currentUser = new User(1, 'test@email.com', 'Test', 'User', 'testuser');
    service.logout();
    expect(service.currentUser).toEqual(new User(0, '', '', '', ''));
    const req = httpMock.expectOne(`${environment.baseUrl}/auth/logout`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

})