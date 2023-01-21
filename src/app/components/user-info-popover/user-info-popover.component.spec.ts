import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoPopoverComponent } from './user-info-popover.component';

describe('UserInfoPopoverComponent', () => {
  let component: UserInfoPopoverComponent;
  let fixture: ComponentFixture<UserInfoPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoPopoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
