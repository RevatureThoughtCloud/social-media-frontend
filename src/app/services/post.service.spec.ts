import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import User from '../models/User';
import { NotificationService } from './notification.service';
import { of } from 'rxjs';

// This test file tests the PostService which is responsible for handling all post-related logic
describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  // Configure the test environment before each test
  beforeEach(() => {
    const mockNotificationService = {
      getNotificationCount: jasmine.createSpy().and.returnValue(of(1))
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    // Override the provider for the NotificationService
    TestBed.overrideProvider(NotificationService, { useValue: mockNotificationService });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Verify that there are no outstanding requests after each test
  afterEach(() => {
    httpTestingController.verify();
  });

  // Test that the post service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // getAllPosts() Unit Test
  it('should return all posts', () => {
    // Test data
    const testPostsForGetAllPosts = [
      new Post(1, 'Test post 1', 'test-image-1.jpg', new User(1, 'test@test.com', 'Test', 'User', 'testuser'), [], 'text'),
      new Post(2, 'Test post 2', 'test-image-2.jpg', new User(1, 'test@test.com', 'Test', 'User', 'testuser'), [], 'text'),
    ];

    // Subscribe to the service method and assert that the returned data is correct
    service.getAllPosts().subscribe(posts => {
      expect(posts).toEqual(testPostsForGetAllPosts);
    });

    // Expect a GET request to the post endpoint and flush the test data
    const req = httpTestingController.expectOne(`${environment.baseUrl}/post`);
    expect(req.request.method).toEqual('GET');
    req.flush(testPostsForGetAllPosts);

  });

  // getAllTopPosts() Unit Test
  it('should return all top posts', () => {
    // Test data
    const testPostsForGetAllTopPosts = [
      new Post(1, 'Test post 1', 'test-image-1.jpg', new User(1, 'test@test.com', 'Test', 'User', 'testuser'), [], 'text'),
      new Post(2, 'Test post 2', 'test-image-2.jpg', new User(1, 'test@test.com', 'Test', 'User', 'testuser'), [], 'text'),
    ];

    // Subscribe to the service method and assert that the returned data is correct
    service.getAllTopPosts().subscribe(posts => {
      expect(posts).toEqual(testPostsForGetAllTopPosts);
    });

    // Expect a GET request to the post/feed endpoint and flush the test data
    const req = httpTestingController.expectOne(`${environment.baseUrl}/post/feed`);
    expect(req.request.method).toEqual('GET');
    req.flush(testPostsForGetAllTopPosts);
  });

  // getPostsByAuthor() Unit Test
  it('should return all posts by the specified author', () => {
    // Test data
    const testPostsForGetPostsByAuthor = [
      new Post(1, 'Test post 1', 'test-image-1.jpg', new User(1, 'test@test.com', 'Test', 'User', 'testuser'), [], 'text'),
      new Post(2, 'Test post 2', 'test-image-2.jpg', new User(1, 'test@test.com', 'Test', 'User', 'testuser'), [], 'text'),
    ];
    const authorId = 1;

    // Subscribe to the service method and assert that the returned data is correct
    service.getPostsByAuthor(authorId).subscribe(posts => {
      expect(posts).toEqual(testPostsForGetPostsByAuthor);
    });

    // Expect a GET request to the post/author/:authorId endpoint and flush the test data
    const req = httpTestingController.expectOne(`${environment.baseUrl}/post/author/${authorId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testPostsForGetPostsByAuthor);
  });

  // upsertPost() Unit Test
  it('should upsert the post', () => {
    // Test data
    const testPostsForUpsertPosts = new Post(1, 'Test post 1', 'test-image-1.jpg', new User(1, 'test@test.com', 'Test', 'User', 'testuser'), [], 'text');
    
    // Subscribe to the service method and assert that the returned data is correct
    service.upsertPost(testPostsForUpsertPosts).subscribe(post => {
      expect(post).toEqual(testPostsForUpsertPosts);
    });

    // Expect a PUT request to the post endpoint and flush the test data
    const req = httpTestingController.expectOne(`${environment.baseUrl}/post`);
    expect(req.request.method).toEqual('PUT');
    req.flush(testPostsForUpsertPosts);
  });

})