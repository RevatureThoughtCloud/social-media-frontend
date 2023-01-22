import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { authReducer } from 'src/app/store/reducers/auth.reducer';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({ auth: authReducer }),
      ],
      declarations: [RegisterComponent],
      providers: [AuthService],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a registerForm', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('should call the register method of authService when onSubmit is called', () => {
    const spy = spyOn(authService, 'register').and.returnValue(of({}));
    component.onSubmit({ preventDefault: () => { } });
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to login page when register is successful', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate').and.callThrough();
    spyOn(authService, 'register').and.returnValue(of({}));
    component.onSubmit({ preventDefault: () => { } });
    expect(spy).toHaveBeenCalledWith(['login']);
  });
});
