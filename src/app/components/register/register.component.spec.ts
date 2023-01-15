import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  // Configure the test environment before each test
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [RegisterComponent],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    spyOn(authService, 'register').and.callThrough();
    fixture.detectChanges();
  });

  // Test that the register component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // onSubmit() Unit Test
  it('should call register method of authService on submit', () => {
    component.onSubmit(new Event('submit'));
    expect(authService.register).toHaveBeenCalled();
  });

});