import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from 'src/app/services/auth.service';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [UserCardComponent],
      providers: [
        {
          provide: AuthService,
          useValue: { currentUser: { userName: 'testUser' } },
        },
        provideMockStore({}),
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
