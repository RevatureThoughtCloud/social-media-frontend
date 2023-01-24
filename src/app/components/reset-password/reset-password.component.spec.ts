import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { AngularMaterialModule } from "src/app/modules/angular-material.module";
import { AuthService } from "src/app/services/auth.service";
import { ResetPasswordComponent } from "./reset-password.component";

class ActivatedRouteStub {
  queryParams = of({ token: 'test' });
}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, AngularMaterialModule, BrowserAnimationsModule],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub }, provideMockStore({}), AuthService],
      declarations: [ResetPasswordComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
