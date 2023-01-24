import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedAccountComponent } from './verified-account.component';

describe('VerifiedAccountComponent', () => {
  let component: VerifiedAccountComponent;
  let fixture: ComponentFixture<VerifiedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
