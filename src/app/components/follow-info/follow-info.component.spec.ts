import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowInfoComponent } from './follow-info.component';

describe('FollowInfoComponent', () => {
  let component: FollowInfoComponent;
  let fixture: ComponentFixture<FollowInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
