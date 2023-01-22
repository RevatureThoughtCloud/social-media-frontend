import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FollowStatusComponent } from './follow-status.component';

describe('FollowStatusComponent', () => {
  let component: FollowStatusComponent;
  let fixture: ComponentFixture<FollowStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowStatusComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
