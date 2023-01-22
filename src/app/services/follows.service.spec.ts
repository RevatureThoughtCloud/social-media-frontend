import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import User from "../models/User";
import { FollowsService } from "./follows.service";

describe('FollowsService', () => {
  let service: FollowsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FollowsService]
    });
    service = TestBed.inject(FollowsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call currentUserFollow()', () => {
    const followUserName = 'user1';
    service.currentUserFollow(followUserName).subscribe(res => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne(`${service.baseUrl}/user/follow/${followUserName}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call currentUserUnFollow()', () => {
    const unfollowUserName = 'user1';
    service.currentUserUnFollow(unfollowUserName).subscribe(res => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne(`${service.baseUrl}/user/unfollow/${unfollowUserName}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should call getUsersFollowers()', () => {
    const username = 'user1';
    const mockUsers: User[] = [
      new User(1, 'email1', 'first1', 'last1', 'user1', 0, 0, 'about me 1', false),
      new User(2, 'email2', 'first2', 'last2', 'user2', 0, 0, 'about me 2', false)
    ];
    service.getUsersFollowers(username).subscribe(res => {
      expect(res).toEqual(mockUsers);
    });
    const req = httpMock.expectOne(`${service.baseUrl}/user/${username}/followers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
})