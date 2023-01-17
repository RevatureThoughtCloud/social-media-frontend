import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import Post from "src/app/models/Post";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { PostComponent } from "./post.component";

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let authService: AuthService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    authService = new AuthService(httpClient);
    authService.currentUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      userName: 'testuser'
    } as User;

    TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [{ provide: HttpClient, useValue: httpClient }, { provide: AuthService, useValue: authService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    component.post = new Post(
      0,
      'Test post text',
      '',
      authService.currentUser,
      [],
      'Comment'
    )

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
