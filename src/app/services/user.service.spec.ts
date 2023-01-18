import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import User from '../models/User';

fdescribe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by id', () => {
    const testUser = new User(1, 'test@email.com', 'Test', 'User', 'testuser', 5, 10);
    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(testUser);
    });

    const req = httpMock.expectOne(`${service.userUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(testUser);
  });
});